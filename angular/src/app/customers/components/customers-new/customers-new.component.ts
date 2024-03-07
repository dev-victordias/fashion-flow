import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observer } from 'rxjs';
import { CustomersService } from '../../services/customers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss'],
})
export class CustomersNewComponent implements OnInit {
  clientForm!: FormGroup;

  cpf = new FormControl('', [Validators.required]);

  cnpj = new FormControl('');

  cep = new FormControl('', [Validators.required]);

  phone = new FormControl('', [Validators.required]);

  email = new FormControl('', [Validators.required, Validators.email]);

  date = new FormControl('', [
    this.dateValidator.bind(this),
  ]);

  constructor(
    private fb: FormBuilder,
    private service: CustomersService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CustomersNewComponent>,
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientType: ['individual'], // Valor padrão pode ser alterado conforme necessário
      name: ['', Validators.required],
      phone: this.phone,
      email: this.email,
      date: this.date,
      cpf: this.cpf,
      cnpj: this.cnpj,
      stateRegistration: [''],
      corporateReason: [''],
      fantasyName: [''],
      cep: this.cep,
      address: ['', Validators.required],
      addressComplement: ['', Validators.required],
      referencePoint: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  observer: Observer<any> = {
    next: () => this.onSuccess(),
    error: () => this.onError('Erro ao salvar cliente!'),
    complete: () => {/* optional complete handling */ }
  };

  private onSuccess() {
    this._snackBar.open('Cliente salvo com sucesso!', '', { duration: 3000 });
    this.dialogRef.close(true);
  }

  private onError(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

  

  getErrorMessage(fieldName: string) {
    const field = this.clientForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório!';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 20;
      return `Tamanho máximo de ${requiredLength} caracteres excedido`;
    }
    return 'Campo inválido!';
  }

  cpfMask($event: KeyboardEvent) {
    let value = this.cpf.value?.replace(/\D/g, '');
    value = value?.replace(/(\d{3})(\d)/, '$1.$2');
    value = value?.replace(/(\d{3})(\d)/, '$1.$2');
    value = value?.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.cpf.setValue(value ? value : '');
  }

  cnpjMask($event: KeyboardEvent) {
    let value = this.cnpj.value?.replace(/\D/g, '');
    value = value?.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value?.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value?.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value?.replace(/(\d{4})(\d)/, '$1-$2');
    this.cnpj.setValue(value ? value : '', { emitEvent: false });
  }

  phoneMask($event: KeyboardEvent) {
    let value = this.phone.value?.replace(/\D/g, '');

    if (value!.length >= 2) {
      value = value?.replace(/^(\d{2})/, '($1) ');
    }

    if (value!.length > 12) {
      value = value?.replace(/(\d{4})$/, '-$1');
    }

    this.phone.setValue(value || '', { emitEvent: false });
  }

  cepMask($event: KeyboardEvent) {
    let value = this.cep.value?.replace(/\D/g, '');

    value = value?.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');

    this.cep.setValue(value || '', { emitEvent: false });
  }

  dateMask() {
    let value = this.date.value?.replace(/\D/g, '');
    if (value) {
      if (value.length > 8) {
        value = value.slice(0, 8);
      }

      if (value.length >= 5) {
        value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
      } else {
        value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
      }

      this.date.setValue(value);

      /* if (value.length === 10 && !this.isDateValid(value)) {
        setTimeout(() => {
          if (value?.length === 10 && !this.isDateValid(value)) {
            alert('Digite uma data válida!');
          }
        }, 0);
      } */
    }
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateString = control.value;

    if (!dateString) {
      return null; // Se estiver vazio, a validação não é aplicada
    }

    const parts = dateString.split('/');

    if (parts.length !== 3) {
      return { invalidDate: true }; // A data deve ter três partes: dia, mês e ano
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês é base 0 no objeto Date
    const year = parseInt(parts[2], 10);

    const currentYear = new Date().getFullYear();
    const minYear = 1900;

    if (year < minYear || year > currentYear) {
      return { invalidDate: true, invalidYear: true };
    }

    const dateObject = new Date(year, month, day);

    if (
      dateObject.getFullYear() !== year ||
      dateObject.getMonth() !== month ||
      dateObject.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    return null; // A data é válida
  }

  teste(element: HTMLInputElement) {
    let cep = element.value;
    this.service.searchCep(cep).subscribe(
      (returnCep: any) => {
        this.clientForm.patchValue({
          address: returnCep.logradouro,
          neighborhood: returnCep.bairro,
          city: returnCep.localidade,
          state: returnCep.uf,
        });
      },
      (error) => {
        console.error('Erro na chamada de API', error);
      }
    );
  }

  onSubmit() {
    console.log(this.clientForm.valid)
    if(this.clientForm.valid) {
      this.service.save(this.clientForm.value).subscribe(this.observer);
    }
  }
}

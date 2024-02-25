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

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss'],
})
export class CustomersNewComponent implements OnInit {
  clientForm!: FormGroup;

  cpf = new FormControl('', [
    Validators.required,
    //Validators.pattern('^[0-9]*$'),
    //Validators.maxLength(14)
  ]);

  cnpj = new FormControl('', [
    Validators.required,
    //Validators.pattern('^[0-9]*$'),
    //Validators.maxLength(18)
  ]);

  date = new FormControl('', [Validators.required, this.dateValidator.bind(this)]);

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientType: ['individual'], // Valor padrão pode ser alterado conforme necessário
      name: ['', Validators.required],
      cpf: this.cpf,
      phone: ['', Validators.required],
      date: this.date,
      companyName: ['', Validators.required],
      cnpj: this.cnpj,
    });
  }

  onSubmit() {
    // Lógica para enviar dados ao servidor
    console.log(this.clientForm.value);
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
}

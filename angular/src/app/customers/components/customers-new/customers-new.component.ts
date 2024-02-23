import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientType: ['individual'], // Valor padrão pode ser alterado conforme necessário
      name: ['', Validators.required],
      cpf: this.cpf,
      phone: ['', Validators.required],
      birth: ['', Validators.required],
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
    let value = this.cpf.value?.replace(/\D/g, "");
    value = value?.replace(/(\d{3})(\d)/, "$1.$2");
    value = value?.replace(/(\d{3})(\d)/, "$1.$2");
    value = value?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.cpf.setValue(value ? value : "");
  }

  cnpjMask($event: KeyboardEvent) {
    let value = this.cnpj.value?.replace(/\D/g, "");
    value = value?.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value?.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value?.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value?.replace(/(\d{4})(\d)/, "$1-$2");
    this.cnpj.setValue(value ? value : "", { emitEvent: false });
  }
}

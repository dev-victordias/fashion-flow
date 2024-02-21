import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers-new',
  templateUrl: './customers-new.component.html',
  styleUrls: ['./customers-new.component.scss'],
})
export class CustomersNewComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientType: ['individual'], // Valor padrão pode ser alterado conforme necessário
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      companyName: ['', Validators.required],
      cnpj: ['', Validators.required],
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
}

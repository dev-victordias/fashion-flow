import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: [0, [Validators.required]],
    size: ['', [Validators.required]],
    reference: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
  });

  typeOptions = [
    { value: 'Vestido', viewValue: 'Vestido' },
    { value: 'Calça', viewValue: 'Calça' },
    { value: 'Blusa', viewValue: 'Blusa' },
    // Adicione mais opções conforme necessário
  ];

  sizeOptions = [
    { value: 'PP', viewValue: 'PP' },
    { value: 'P', viewValue: 'P' },
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'GG', viewValue: 'GG' },
    { value: 'G1', viewValue: 'G1' },
    { value: 'G2', viewValue: 'G2' },
  ];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.form.setValue({
      _id: product._id,
      name: product.name,
      type: product.type,
      size: product.size,
      reference: product.reference,
      quantity: product.quantity,
      price: product.price,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError('Erro na conexão com o banco de dados!')
      );
    } else {
      this.onError('Preencha todos os campos com valores válidos!');
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open('Produto salvo com sucesso!', '', { duration: 3000 });
    this.location.back();
  }

  private onError(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
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

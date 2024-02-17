import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-product-form',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.scss'],
  providers: [CurrencyPipe],
})
export class ProductsNewComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required]],
    size: ['', [Validators.required]],
    reference: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
  });

  typeOptions = [
    { value: 'Vestido', viewValue: 'Vestido' },
    { value: 'Calça', viewValue: 'Calça' },
    { value: 'Blusa', viewValue: 'Blusa' },
    { value: 'Blazer', viewValue: 'Blazer' },
    { value: 'Conjunto', viewValue: 'Conjunto' },
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
    private dialogRef: MatDialogRef<ProductsNewComponent>,
    private currencyPipe: CurrencyPipe,
    @Inject(MAT_DIALOG_DATA) public data: Product // Injete os dados do produto  
  ) { }

  ngOnInit(): void {
    const product: Product = this.data;
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
      this.service.save(this.form.value).subscribe(this.observer)
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private onSuccess() {
    this._snackBar.open('Produto salvo com sucesso!', '', { duration: 3000 });
    this.dialogRef.close(true);
  }

  private onError(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

  observer: Observer<any> = {
    next: () => this.onSuccess(),
    error: () => this.onError('Erro na conexão com o banco de dados!'),
    complete: () => {/* optional complete handling */ }
  };


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
  formatPrice(event: any) {
    let element = event.target;
    let value = element.value;

    element.value = this.currencyPipe.transform(
      value / 100,
      'BRL',
      '',
      '1.2-2',
      'pt-BR'
    );
  }
}

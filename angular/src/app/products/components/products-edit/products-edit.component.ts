import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
  providers: [CurrencyPipe],
})
export class ProductsEditComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required]],
    size: ['', [Validators.required]],
    reference: ['', [Validators.required]],
    barCode: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
  });

  typeOptions = [
    { value: 'Blusa', viewValue: 'Blusa' },
    { value: 'Saia', viewValue: 'Saia' },
    { value: 'Calça', viewValue: 'Calça' },
    { value: 'Short', viewValue: 'Short' },
    { value: 'Vestido', viewValue: 'Vestido' },
    { value: 'Macacão', viewValue: 'Macacão' },
    { value: 'Casaco', viewValue: 'Casaco' },
    { value: 'Calçado', viewValue: 'Calçado' },
    { value: 'Acessório', viewValue: 'Acessório' },
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
    private dialogRef: MatDialogRef<ProductsEditComponent>,
    private currencyPipe: CurrencyPipe,
    @Inject(MAT_DIALOG_DATA) public data: Product // Injete os dados do produto
  ) {}

  ngOnInit(): void {
    const product: Product = this.data;
    // Formata o preço usando CurrencyPipe
    const formattedPrice = this.formatPriceView(product.price) ?? '0';

    this.form.setValue({
      _id: product._id,
      name: product.name,
      type: product.type,
      size: product.size,
      reference: product.reference,
      barCode: product.barCode,
      quantity: product.quantity,
      price: formattedPrice,
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.form.value.price = this.form.value.price?.replace(",", ".");
      this.service.save(this.form.value).subscribe(this.observer);
    } else {
      this.dialogRef.close();
    }
  }

  private formatPriceView(price: string) {
    // Use o currencyPipe para formatar o preço
    return this.currencyPipe.transform(price, 'BRL', '', '1.2-2');
  }
  

  onCancel() {
    this.dialogRef.close();
  }

  private onSuccess() {
    this._snackBar.open('Produto editado com sucesso!', '', { duration: 3000 });
    this.dialogRef.close(true);
  }

  private onError(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

  observer: Observer<any> = {
    next: () => this.onSuccess(),
    error: () => this.onError('Erro na conexão com o banco de dados!'),
    complete: () => {
      /* optional complete handling */
    },
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
      value/100,
      'BRL',
      '',
      '1.2-2',
      'pt-BR'
    );
  }
}

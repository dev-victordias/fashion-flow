import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, UntypedFormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute ) {

    }

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.form.setValue({
      _id: product._id,
      name: product.name
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }
  
  private onSuccess() {
    this._snackBar.open('Produto salvo com sucesso!', '', {duration: 3000});
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar produto!', '', {duration: 3000});
  }

  getErrorMessage(fieldName: string) {
    	const field = this.form.get(fieldName);
      if(field?.hasError('required')) {
        return 'Campo obrigatório!'
      }

      if(field?.hasError('minlength')) {
        const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
      }

      if(field?.hasError('maxlength')) {
        const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 20;
        return `Tamanho máximo de ${requiredLength} caracteres excedido`;
      }
      return 'Campo inválido!'
    }
}

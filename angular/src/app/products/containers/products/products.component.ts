import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';
import { ProductFormComponent } from '../products-form/products-form.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> | null = null;

  //productsService: productsService;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh();
  }
  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.products$ = this.productsService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar produtos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.dialog.open(ProductFormComponent, {
      width: '600px',
    });
  }

  onEdit(product: Product) {
    this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: product,
    });
  }

  onView(product: Product) {
    this.dialog.open(ViewDialogComponent, {
      width: '600px',
      data: product,
    });
  }

  onRemove(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover "${product.name}" da lista de produtos?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productsService.remove(product._id).subscribe(
          () => {
            this.refresh();
            this._snackBar.open('Produto removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover produto.')
        );
      }
    });
  }
}
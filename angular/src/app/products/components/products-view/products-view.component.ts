import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/products/model/product';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {
  @Output() editClicked = new EventEmitter<Product>();

  constructor(
    public dialogRef: MatDialogRef<ProductsViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialog: MatDialog,
  ) { }

  onEdit(product: Product) {
    this.editClicked.emit(product);
    this.dialogRef.close();
  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}

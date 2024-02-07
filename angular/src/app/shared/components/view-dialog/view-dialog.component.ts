import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/products/model/product';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {
  @Output() editClicked = new EventEmitter<Product>();

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
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

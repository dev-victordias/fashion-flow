import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/products/model/product';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) { 
    console.log(data)
  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}

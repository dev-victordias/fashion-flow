import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { TypePipe } from './pipes/type.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, TypePipe, ConfirmationDialogComponent],
  imports: [AppMaterialModule, CommonModule],
  exports: [ErrorDialogComponent, TypePipe, ConfirmationDialogComponent],
})
export class SharedModule { }

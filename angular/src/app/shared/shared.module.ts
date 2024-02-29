import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { TypePipe } from './pipes/type.pipe';


@NgModule({
  declarations: [ErrorDialogComponent, TypePipe, ConfirmationDialogComponent],
  imports: [AppMaterialModule, CommonModule],
  exports: [ErrorDialogComponent, TypePipe, ConfirmationDialogComponent, MatDatepickerModule, MatNativeDateModule],
})
export class SharedModule { }

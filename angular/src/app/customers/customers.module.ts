import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersNewComponent } from './customers-new/customers-new.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [CustomersComponent, CustomersListComponent, CustomersNewComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule {}

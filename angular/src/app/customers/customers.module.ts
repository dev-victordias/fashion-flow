import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [CustomersComponent, CustomersListComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule {}

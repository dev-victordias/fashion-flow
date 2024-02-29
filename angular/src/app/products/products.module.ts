import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsNewComponent } from './components/products-new/products-new.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsNewComponent,
    ProductsListComponent,
    ProductsEditComponent,
    ProductsViewComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule {}

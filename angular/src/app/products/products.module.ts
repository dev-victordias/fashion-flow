import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsNewComponent } from './components/products-new/products-new.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';

@NgModule({
  declarations: [ProductsComponent, ProductsNewComponent, ProductsListComponent, ProductsEditComponent, ProductsViewComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class ProductsModule {}

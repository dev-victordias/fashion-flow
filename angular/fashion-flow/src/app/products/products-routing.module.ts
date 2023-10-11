import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { ProductFormComponent } from './containers/products-form/products-form.component';
import { productResolver } from './guards/product.resolver';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: ProductFormComponent, resolve: { product: productResolver} },
  { path: 'edit/:id', component: ProductFormComponent, resolve: { product: productResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

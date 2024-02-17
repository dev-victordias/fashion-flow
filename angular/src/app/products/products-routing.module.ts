import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductsNewComponent } from './components/products-new/products-new.component';
import { productResolver } from './guards/product.resolver';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: ProductsNewComponent, resolve: { product: productResolver} },
  { path: 'edit/:id', component: ProductsNewComponent, resolve: { product: productResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

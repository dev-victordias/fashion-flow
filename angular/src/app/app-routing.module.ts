import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((p) => p.ProductsModule),
  },
   {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((c) => c.CustomersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

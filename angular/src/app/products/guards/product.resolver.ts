import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';

export const productResolver: ResolveFn<Observable<Product>> = (route, state, service: ProductsService = inject(ProductsService)) => {

  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }
  
  return of({ _id: '', name: '', type: '', description: '', price: 0, quantity: 0, size: 'p' });
};

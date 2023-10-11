import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './product.resolver';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

describe('productsResolver', () => {
  const executeResolver: ResolveFn<Observable<Product>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

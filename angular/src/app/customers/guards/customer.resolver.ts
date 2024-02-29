import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Customer } from '../model/customer';
import { CustomersService } from '../services/customers.service';

export const customerResolver: ResolveFn<Observable<Customer>> = (route, state, service: CustomersService = inject(CustomersService)) => {

  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }
  
  return of({ _id: '', name: '', email: ''});
};

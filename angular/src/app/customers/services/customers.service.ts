import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly API = 'api/v1/customers';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Customer[]>(this.API).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Customer>(`${this.API}/${id}`);
  }

  save(record: Partial<Customer>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Customer>) {
    return this.httpClient.post<Customer>(this.API, record).pipe(first());
  }

  private update(record: Partial<Customer>) {
    return this.httpClient
      .put<Customer>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}

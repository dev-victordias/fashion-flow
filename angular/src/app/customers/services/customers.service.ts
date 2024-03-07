import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly API = 'api/v1/customers';
  private readonly CEP_API = 'https://viacep.com.br/ws/';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Customer[]>(this.API).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Customer>(`${this.API}/${id}`);
  }

  save(record: Partial<Customer>) {
    console.log(record);
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  searchCep(cep: string) {
    return this.httpClient.get(`${this.CEP_API}/${cep}/json`).pipe(first());
  }

  private create(record: Partial<Customer>) {
    console.log(record);
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

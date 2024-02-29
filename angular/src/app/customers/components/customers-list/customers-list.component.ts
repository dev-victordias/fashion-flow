import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Customer } from '../../model/customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  @Input() customers: Customer[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() view = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = [
    'name',
    'email',
    'actions'
  ];
  dataSource = new MatTableDataSource<Customer>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this.dataSource.data = this.customers;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(input: HTMLInputElement) {
    const filterValue = input.value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  onAdd() {
    this.add.emit(true);
  }

}

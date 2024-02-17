import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../model/product';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() view = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = [
    'reference',
    'name',
    'type',
    'quantity',
    'size',
    'price',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this.dataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onAdd() {
    this.add.emit(true);
  }

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onView(product: Product) {
    this.view.emit(product);
  }

  onDelete(product: Product) {
    this.remove.emit(product);
  }

  applyFilter(input: HTMLInputElement) {
    const filterValue = input.value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  formatReference(reference: string): string {
    if (reference && reference.length >= 5) {
      return `${reference.slice(0, 4)}-${reference.slice(4)}`;
    }
    return reference;
  }
}

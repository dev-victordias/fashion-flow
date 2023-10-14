import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../model/product';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  
  readonly displayedColumns = ['name', 'type', 'quantity', 'size', 'price','actions'];
  dataSource = new MatTableDataSource<Product>([]);
  
  constructor() {}
  
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue) {
      // Atualize a fonte de dados quando os dados forem alterados
      this.dataSource.data = this.products;
    }
  }
  
  onAdd() {
    this.add.emit(true);
  }
  
  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    this.remove.emit(product);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
  }
}

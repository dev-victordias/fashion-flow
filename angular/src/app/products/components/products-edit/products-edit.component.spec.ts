import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './products-edit.component';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditComponent]
    });
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewComponent } from './products-new.component';

describe('ProductNewComponent', () => {
  let component: ProductNewComponent;
  let fixture: ComponentFixture<ProductNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductNewComponent]
    });
    fixture = TestBed.createComponent(ProductNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

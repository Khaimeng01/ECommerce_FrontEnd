import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductTableViewComponent } from './seller-product-table-view.component';

describe('SellerProductTableViewComponent', () => {
  let component: SellerProductTableViewComponent;
  let fixture: ComponentFixture<SellerProductTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

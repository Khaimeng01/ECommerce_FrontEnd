import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderHistoryComponent } from './seller-order-history.component';

describe('SellerOrderHistoryComponent', () => {
  let component: SellerOrderHistoryComponent;
  let fixture: ComponentFixture<SellerOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

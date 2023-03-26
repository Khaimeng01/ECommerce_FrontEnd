import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRegisterAccountComponent } from './seller-register-account.component';

describe('SellerRegisterAccountComponent', () => {
  let component: SellerRegisterAccountComponent;
  let fixture: ComponentFixture<SellerRegisterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerRegisterAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

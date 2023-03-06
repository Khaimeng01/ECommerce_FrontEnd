import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProilerPageComponent } from './product-proiler-page.component';

describe('ProductProilerPageComponent', () => {
  let component: ProductProilerPageComponent;
  let fixture: ComponentFixture<ProductProilerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductProilerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProilerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

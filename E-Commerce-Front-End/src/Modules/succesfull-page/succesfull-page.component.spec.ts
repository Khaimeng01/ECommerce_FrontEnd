import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfullPageComponent } from './succesfull-page.component';

describe('SuccesfullPageComponent', () => {
  let component: SuccesfullPageComponent;
  let fixture: ComponentFixture<SuccesfullPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesfullPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesfullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

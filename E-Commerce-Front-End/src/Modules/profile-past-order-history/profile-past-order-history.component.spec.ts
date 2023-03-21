import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePastOrderHistoryComponent } from './profile-past-order-history.component';

describe('ProfilePastOrderHistoryComponent', () => {
  let component: ProfilePastOrderHistoryComponent;
  let fixture: ComponentFixture<ProfilePastOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePastOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePastOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

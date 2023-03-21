import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccountManagementComponent } from './profile-account-management.component';

describe('ProfileAccountManagementComponent', () => {
  let component: ProfileAccountManagementComponent;
  let fixture: ComponentFixture<ProfileAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAccountManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

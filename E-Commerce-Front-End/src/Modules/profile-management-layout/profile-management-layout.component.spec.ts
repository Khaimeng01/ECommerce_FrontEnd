import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementLayoutComponent } from './profile-management-layout.component';

describe('ProfileManagementLayoutComponent', () => {
  let component: ProfileManagementLayoutComponent;
  let fixture: ComponentFixture<ProfileManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileManagementLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

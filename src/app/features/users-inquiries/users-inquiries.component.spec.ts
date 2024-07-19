import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInquiriesComponent } from './users-inquiries.component';
import { IsFocusableConfig } from '@angular/cdk/a11y';

describe('UsersInquiriesComponent', () => {
  let component: UsersInquiriesComponent;
  let fixture: ComponentFixture<UsersInquiriesComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersInquiriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInqureComponent } from './user-inqure.component';

describe('UserInqureComponent', () => {
  let component: UserInqureComponent;
  let fixture: ComponentFixture<UserInqureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInqureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInqureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

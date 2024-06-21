import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinsuranceComponent } from './homeinsurance.component';

describe('HomeinsuranceComponent', () => {
  let component: HomeinsuranceComponent;
  let fixture: ComponentFixture<HomeinsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeinsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

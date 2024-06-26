import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthinsuranceComponent } from './healthinsurance.component';

describe('HealthinsuranceComponent', () => {
  let component: HealthinsuranceComponent;
  let fixture: ComponentFixture<HealthinsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthinsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InsuranceChartService } from './insurance-chart.service';

describe('InsuranceChartService', () => {
  let service: InsuranceChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserChartService } from './user-chart.service';

describe('UserChartService', () => {
  let service: UserChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

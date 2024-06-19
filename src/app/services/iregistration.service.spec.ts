import { TestBed } from '@angular/core/testing';

import { IregistrationService } from './iregistration.service';

describe('IregistrationService', () => {
  let service: IregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

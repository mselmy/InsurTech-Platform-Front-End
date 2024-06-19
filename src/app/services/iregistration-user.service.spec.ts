import { TestBed } from '@angular/core/testing';

import { IregistrationUserService } from './iregistration-user.service';

describe('IregistrationUserService', () => {
  let service: IregistrationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IregistrationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

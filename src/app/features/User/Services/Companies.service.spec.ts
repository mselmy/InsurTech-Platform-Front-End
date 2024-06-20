/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompaniesService } from './Companies.service';

describe('Service: Companies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesService]
    });
  });

  it('should ...', inject([CompaniesService], (service: CompaniesService) => {
    expect(service).toBeTruthy();
  }));
});

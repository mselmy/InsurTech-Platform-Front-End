import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

describe('intercept', () => {
  const intercept: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => intercept(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(intercept).toBeTruthy();
  });
});

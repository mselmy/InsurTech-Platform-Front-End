import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { registerUser } from '../services/iregistration-user.service';
import { BASE_URL } from '../base-url';

@Injectable({
  providedIn: 'root',
})
export class RegistrationUserService {
  private getByEmailUrl = `${BASE_URL}/Account/GetUserByEmail`;
  private getByUserNameUrl =
    `${BASE_URL}/Account/GetUserByUserName`;
  private getCustomerByNationalIdUrl =
    `${BASE_URL}/Account/GetCustomerByNationalId`;
  private registerCustomerUrl =
    `${BASE_URL}/Account/RegisterCustomer`;

  constructor(private http: HttpClient) {}
  registerCustomer(user: registerUser): Observable<any> {
    return this.http.post<any>(this.registerCustomerUrl, user);
  }
  checkEmailAvailability(email: string): Observable<void> {
    return this.http
      .get<any>(`${this.getByEmailUrl}/${encodeURIComponent(email)}`)
      .pipe(
        map((response) => {
          if (response) {
            throw new Error('Email is already taken');
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of();
          }
          return throwError(() => error);
        })
      );
  }

  checkUsernameAvailability(username: string): Observable<void> {
    return this.http
      .get<any>(`${this.getByUserNameUrl}/${encodeURIComponent(username)}`)
      .pipe(
        map((response) => {
          if (response) {
            throw new Error('Username is already taken');
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of();
          }
          return throwError(() => error);
        })
      );
  }

  checkNationalIdAvailability(nationalId: string): Observable<void> {
    return this.http
      .get<any>(
        `${this.getCustomerByNationalIdUrl}/${encodeURIComponent(nationalId)}`
      )
      .pipe(
        map((response) => {
          if (response) {
            throw new Error('National ID is already taken');
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of();
          }
          return throwError(() => error);
        })
      );
  }
}

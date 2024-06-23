import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registerUser } from './iregistration-user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegistrationUserService {
  private registerCustomerUrl =
    'http://localhost:5028/api/Account/RegisterCustomer';
  private getByEmailUrl = 'http://localhost:5028/api/Account/GetUserByEmail';
  private getByUserNameUrl =
    'http://localhost:5028/api/Account/GetUserByUserName';
  private getCustomerByNationalIdUrl =
    'http://localhost:5028/api/Account/GetCustomerByNationalId';

  constructor(private http: HttpClient) {}

  registerCustomer(user: registerUser): Observable<any> {
    return this.http.post<any>(this.registerCustomerUrl, user);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.getByUserNameUrl}?userName=${username}`)
      .pipe(
        map((response) => {
          return response ? true : false;
        }),
        catchError((error) => {
          return of(true);
        })
      );
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<any>(`${this.getByEmailUrl}?email=${email}`).pipe(
      map((response) => {
        return response ? true : false;
      }),
      catchError((error) => {
        return of(true);
      })
    );
  }
  checkNationalIdAvailability(nationalId: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.getCustomerByNationalIdUrl}?nationalId=${nationalId}`)
      .pipe(
        map((response) => {
          return response ? true : false;
        }),
        catchError((error) => {
          return of(true);
        })
      );
  }
}

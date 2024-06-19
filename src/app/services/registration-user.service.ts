import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerUser } from './iregistration-user.service'; // Adjust the path as necessary
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationUserService {
  private registerCustomerUrl =
    'http://localhost:5028/api/Account/RegisterCustomer';

  constructor(private http: HttpClient) {}

  registerCustomer(user: registerUser): Observable<any> {
    return this.http.post<any>(this.registerCustomerUrl, user);
  }
}

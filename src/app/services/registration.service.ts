import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterData } from './iregistration.service'; // Adjust the path as necessary
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private createUserUrl = 'http://localhost:5028/api/Account/RegisterCompany';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterData): Observable<any> {
    return this.http.post<any>(this.createUserUrl, user);
  }
}

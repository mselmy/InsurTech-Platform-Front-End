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
  private companiesUrl = 'http://localhost:5028/api/companies';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterData): Observable<any> {
    return this.http.post<any>(this.createUserUrl, user);
  }

  getCompanies(): Observable<any[]> {
    return this.http
      .get<any[]>(this.companiesUrl)
      .pipe(catchError(() => of([])));
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.getCompanies().pipe(
      map(
        (companies) =>
          !companies.some(
            (company) =>
              company.userName.toLowerCase() === username.toLowerCase()
          )
      )
    );
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.getCompanies().pipe(
      map(
        (companies) =>
          !companies.some(
            (company) => company.email.toLowerCase() === email.toLowerCase()
          )
      )
    );
  }
}

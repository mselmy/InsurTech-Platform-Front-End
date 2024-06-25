import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiBaseUrl = 'http://localhost:5028/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/Account/GetAllUsers`);
  }

  deleteUser(userId: string, userType: number): Observable<any> {
    const url =
      userType === 1
        ? `${this.apiBaseUrl}/companies/${userId}`
        : `${this.apiBaseUrl}/Customers/DeleteCustomer/${userId}`;
    return this.http.delete<any>(url);
  }

  editUser(user: any, userType: number): Observable<any> {
    const url =
      userType === 1
        ? `${this.apiBaseUrl}/companies/${user.id}`
        : `${this.apiBaseUrl}/Customers/UpdateCustomer/${user.id}`;
    return this.http.put<any>(url, user);
  }
}

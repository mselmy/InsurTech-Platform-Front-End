import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../../core/base-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiBaseUrl = BASE_URL;

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

  undoDeleteUser(userId: string, userType: number): Observable<any> {
    const url =
      userType === 1
        ? `${this.apiBaseUrl}/companies/UndoDeleteCompany/${userId}`
        : `${this.apiBaseUrl}/Customers/UndoDeleteCustomer/${userId}`;
    return this.http.put<any>(url, null);
  }

  editUser(user: any, userType: number): Observable<any> {
    const url =
      userType === 1
        ? `${this.apiBaseUrl}/companies/${user.id}`
        : `${this.apiBaseUrl}/Customers/UpdateCustomer/${user.id}`;
    return this.http.put<any>(url, user);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/Customers/UpdateUser`, user);
  }

  checkCompanyPlans(companyId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/InsurancePlan/InsurancePlansByCompanyId/${companyId}`;
    return this.http.get<any>(url).pipe();
  }

  checkCustomerPlans(customerId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/InsurancePlan/InsurancePlansByCustomerId/${customerId}`;
    return this.http.get<any>(url).pipe();
  }
}

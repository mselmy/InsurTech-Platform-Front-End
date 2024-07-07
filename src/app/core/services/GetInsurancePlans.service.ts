import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private baseUrl = 'http://localhost:5028/api/Customers';
  private feedbackUrl = 'http://localhost:5028/api/Feedback';

  constructor(private http: HttpClient) {}

  getCustomerRequests(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetCustomerRequests/${customerId}`);
  }

  postFeedback(feedbackData: any): Observable<any> {
    return this.http.post(this.feedbackUrl, feedbackData);
  }
}

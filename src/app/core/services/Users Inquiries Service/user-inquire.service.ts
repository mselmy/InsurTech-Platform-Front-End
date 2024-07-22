import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../base-url';

export interface UserInquire {
  email: string;
  content: string;
  date: Date;
  isRead: boolean;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserInquireService {
 
//   private addInquiryUrl = `${BASE_URL}/UserInquire/AddUserInquery`;
//   private getInquiriesUrl = `${BASE_URL}/UserInquire/GetUserInquery`; 
//   constructor(private http: HttpClient) {}

//   getUserInquiries(): Observable<UserInquire[]> {
//     return this.http.get<UserInquire[]>(this.getInquiriesUrl);
//   }

//   addUserInquiry(inquiry: UserInquire): Observable<UserInquire> {
//     return this.http.post<UserInquire>(this.addInquiryUrl, inquiry);
//   }
// }
private addInquiryUrl = `${BASE_URL}/UserInquire/AddUserInquery`;
private getInquiriesUrl = `${BASE_URL}/UserInquire/GetUserInquery`;
private sendEmailUrl = `${BASE_URL}/UserInquire/SendUserEmail`;

constructor(private http: HttpClient) {}

getUserInquiries(): Observable<UserInquire[]> {
  return this.http.get<UserInquire[]>(this.getInquiriesUrl);
}

addUserInquiry(inquiry: UserInquire): Observable<UserInquire> {
  return this.http.post<UserInquire>(this.addInquiryUrl, inquiry);
}

sendUserEmail(emailRequest: { toEmail: string; subject: string; content: string }): Observable<any> {
  return this.http.post(this.sendEmailUrl, emailRequest);
}
}

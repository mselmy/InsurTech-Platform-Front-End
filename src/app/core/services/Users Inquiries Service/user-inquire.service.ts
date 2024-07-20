import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
 
  private addInquiryUrl = 'http://localhost:5028/api/UserInquire/AddUserInquery';
  private getInquiriesUrl = 'http://localhost:5028/api/UserInquire/GetUserInquery'; 
  constructor(private http: HttpClient) {}

  getUserInquiries(): Observable<UserInquire[]> {
    return this.http.get<UserInquire[]>(this.getInquiriesUrl);
  }

  addUserInquiry(inquiry: UserInquire): Observable<UserInquire> {
    return this.http.post<UserInquire>(this.addInquiryUrl, inquiry);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forgotpassword } from '../../models/Account/forgotpassword';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) {}

  private baseurl: string = "https://localhost:7113/api/Account/ForgotPassword";

  forgot(email: string): Observable<any> {
    const forgotpass: Forgotpassword = { email };
    return this.http.post<any>(this.baseurl, forgotpass);
  }
}

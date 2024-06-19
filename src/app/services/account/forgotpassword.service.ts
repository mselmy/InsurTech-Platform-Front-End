import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forgotpassword } from '../../models/Account/forgotpassword';
import{Resetpassword} from '../../models/Account/resetpassword'

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) {}

  private baseurl: string = "https://localhost:7113/api/Account/ForgotPasswordAngular";
  private reseturl:string="https://localhost:7113/api/Account/ResetPassword";
  forgot(email: string): Observable<any> {
    const forgotpass: Forgotpassword = { email };
    return this.http.post<any>(this.baseurl, forgotpass);
  }
  reset(email:string,token:String,password:string): Observable<any>{
    const resetobj:Resetpassword={email,token,password}
    return this.http.post<any>(this.reseturl,resetobj );
  }
}

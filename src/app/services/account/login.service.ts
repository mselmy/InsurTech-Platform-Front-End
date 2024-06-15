import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Userlogin } from '../../models/Account/userlogin';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private baseurl:string="https://localhost:7113/api/Account/Login"
    constructor(public http: HttpClient) {}
    user:Userlogin=new Userlogin("","")
    login(email: string, password: string): Observable<any> {
      // debugger
        this.user.email=email;
        this.user.password=password;
      return this.http.post<any>(this.baseurl,this.user );
    }

}

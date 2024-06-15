import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestsServiceService {
  private baseUrl: string = 'https://localhost:44311/api/services';
  constructor( private http:HttpClient) { }

  GetAll(){
    return this.http.get(this.baseUrl + '/app/Company/GetAll');
  }

  GetById(id: number){
    return this.http.get(this.baseUrl + '/app/Company/Get?id=' + id);
  }

  ApproveRequest(id: number){
    return this.http.post(this.baseUrl + '/app/Company/Accept', {"id": id});
  }

  RejectRequest(id: number){
    return this.http.post(this.baseUrl + '/app/Company/Reject', {"id": id});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestsServiceService {
  private baseUrl: string = 'http://localhost:5028/api';
  constructor( private http:HttpClient) { }

  GetAll(){
    return this.http.get(this.baseUrl + '/companies');
  }

  GetById(id: number){
    return this.http.get(this.baseUrl + '/companies/' + id);
  }

  ApproveRequest(id: number){
    return this.http.post(this.baseUrl + '/companies/ApproveCompany/' + id, {});
  }

  RejectRequest(id: number){
    return this.http.post(this.baseUrl + '/companies/RejectCompany/' + id, {});
  }
}

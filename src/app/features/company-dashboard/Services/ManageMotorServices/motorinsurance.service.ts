import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ AddMotorInsurance } from '../../Model/Motorinsurance/add-motor-insurance'
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditMotorInsurance } from '../../Model/Motorinsurance/edit-motor-insurance';
@Injectable({
  providedIn: 'root'
})

export class MotorinsuranceService {
 
  private baseurl: string = "http://localhost:5028/api/MotorInsurance/";
  constructor(public httpClient :HttpClient ) { }
  addmotor(motorinsurance: AddMotorInsurance): Observable<any> {
    return this.httpClient.post<any>(`${this.baseurl}AddMotorPlan`, motorinsurance);

   }
   
   edit(motorinsurance: EditMotorInsurance): Observable<any> {
    return this.httpClient.put<any>(`${this.baseurl}EditMotorPlan/${motorinsurance.id}`, motorinsurance);
  }
  

  getById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseurl}${id}`);
  }
}

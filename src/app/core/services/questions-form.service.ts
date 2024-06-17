import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../base-url';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsFormService {

  constructor(private http:HttpClient) { }

  GetById(id: number){
    return this.http.get(BASE_URL + '/Customers/GetQusetionsByCategory/' + id) as Observable<Question[]>;
  }

  CreateInsurancePlanRequest(request: any){
    return this.http.post(BASE_URL + '/Customers/requestInsurancePlan', request);
  }
}

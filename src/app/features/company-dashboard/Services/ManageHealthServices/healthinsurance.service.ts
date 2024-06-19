import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddHealthInsurance } from '../../Model/Helathinsurance/add-health-insurance';
import { EditHealthInsurance } from '../../Model/Helathinsurance/edit-health-insurance';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthinsuranceService {
  private baseurl: string = "http://localhost:5028/api/HealthInsurance/";

  private healthInsuranceChanges = new Subject<void>();
  public healthInsuranceChanges$ = this.healthInsuranceChanges.asObservable();

  constructor(public http: HttpClient) {}

  add(healthinsurance: AddHealthInsurance): Observable<any> {
    return this.http.post<any>(`${this.baseurl}AddHealthPlan`, healthinsurance).pipe(
      tap(() => this.healthInsuranceChanges.next())
    );
  }

  edit(healthinsurance: EditHealthInsurance): Observable<any> {
    return this.http.put<any>(`${this.baseurl}${healthinsurance.id}`, healthinsurance);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseurl}${id}`);
  }
}

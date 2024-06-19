import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListInsurancePlan } from '../../Model/company/ListInsurancePlan';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyUsers } from '../../Model/company/CompanyUser';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl: string = "http://localhost:5028/api/";

  private insurancePlansSubject = new BehaviorSubject<ListInsurancePlan | null>(null);
  insurancePlans$ = this.insurancePlansSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  GetAll(Id: number): void {
    this.httpClient.get<ListInsurancePlan>(this.baseUrl + "InsurancePlan/InsurancePlansByCompanyId/" + Id)
      .subscribe(data => {
        this.insurancePlansSubject.next(data);
      });
  }

  Delete(Id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "InsurancePlan/DeleteInsurancePlan/" + Id);
  }

  GetCompanyUsers(Id: number): Observable<CompanyUsers[]> {
    return this.httpClient.get<CompanyUsers[]>(this.baseUrl + "companies/Users/" + Id);
  }
}

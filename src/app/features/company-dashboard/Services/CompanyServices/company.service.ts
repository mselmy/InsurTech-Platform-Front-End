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
  private dataSource = new BehaviorSubject<any>(null); 
  currentData = this.dataSource.asObservable();

  constructor(private HttpClient: HttpClient) { }

  GetAll(Id: number) {
    return this.HttpClient.get<ListInsurancePlan>(this.baseUrl +"InsurancePlan/InsurancePlansByCompanyId/"+Id)
  }
  Delete(Id:number)
  {
        return this.HttpClient.delete(this.baseUrl +"InsurancePlan/DeleteInsurancePlan/"+ Id);

  }
  GetCompanyUsers(Id:number)
  {
    return this.HttpClient.get<CompanyUsers[]>(this.baseUrl+"companies/Users/"+Id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListInsurancePlan } from '../../Model/company/ListInsurancePlan';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyUsers } from '../../Model/company/CompanyUser';
import { HealthinsuranceService } from '../ManageHealthServices/healthinsurance.service';
import { HomeinsuranceService } from '../ManageHomeServices/homeinsurance.service';
import { MotorinsuranceService } from '../ManageMotorServices/motorinsurance.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl: string = "http://localhost:5028/api/";
  public companId:number=1;
  private insurancePlansSubject = new BehaviorSubject<ListInsurancePlan | null>(null);
  insurancePlans$ = this.insurancePlansSubject.asObservable();

  constructor(private httpClient: HttpClient,
     private healthinsuranceService: HealthinsuranceService,
     private homeinsuranceServices:HomeinsuranceService,
     private MotornsuranceServies:MotorinsuranceService
    ) {
    this.healthinsuranceService.healthInsuranceChanges$.subscribe(()=>{this.GetAll(this.companId);});
    this.MotornsuranceServies.motorinsurancechanges$.subscribe(()=>{this.GetAll(this.companId);});
    this.homeinsuranceServices.homeinsurancechanges$.subscribe(()=>{this.GetAll(this.companId);});
    
  }

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

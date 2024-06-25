import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyRequests } from '../Models/company-requests';

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestsService {
  private BaseUrl = 'http://localhost:5028/api/companies/';
  // http://localhost:5028/api/companies/ChangeStatus/2
// 
  constructor(private http: HttpClient) {}

  GetAllRequestsByCompanyId(companyId: string): Observable<CompanyRequests[]> {
    return this.http.get<CompanyRequests[]>(`${this.BaseUrl}requests/${companyId}`);
  }
  UpdateAndNotify(RequestId: string, request: CompanyRequests): Observable<any> {
    const url = `${this.BaseUrl}ChangeStatus/${RequestId}`;
    return this.http.put<any>(url, request);
    
  }
  
  
}

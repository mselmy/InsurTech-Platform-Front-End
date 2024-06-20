import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../Model/Categories';
import { Company } from '../Model/Company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private apiUrl = 'http://localhost:5028/api/companies/status/approved';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

}

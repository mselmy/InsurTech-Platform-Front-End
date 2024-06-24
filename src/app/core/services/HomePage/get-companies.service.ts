import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompaniesHomePage } from '../../models/Home_Page/CompaniesHomePage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompaniesService {

  private apiUrl = 'http://localhost:5028/api/companies/status/approved';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<CompaniesHomePage[]> {
    return this.http.get<CompaniesHomePage[]>(this.apiUrl);
  }
}

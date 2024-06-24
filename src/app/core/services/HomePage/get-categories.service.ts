import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../models/Home_Page/Categories';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  private apiUrl = 'http://localhost:5028/api/Category/GetCategories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }
}

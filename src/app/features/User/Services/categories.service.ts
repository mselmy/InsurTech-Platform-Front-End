import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../Model/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:5028/api/Category/GetCategories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }
}

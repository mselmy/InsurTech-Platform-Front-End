import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InsuranceReview } from '../types/IAllFeedBackes';

@Injectable({
  providedIn: 'root',
})
export class ComparingInsuranceService {
  constructor(private http: HttpClient) {}
  BaseUrl = 'http://localhost:5028/api/Feedback';
  // get all feedbacks
  getAllFeedbacks() {
    return this.http.get<InsuranceReview[]>(this.BaseUrl);
  }
}

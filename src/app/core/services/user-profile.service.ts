import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { UserProfile } from '../models/userprofile';
import{BASE_URL} from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = `${BASE_URL}/Customers/GetCustomerById`;
  private mockUser: UserProfile = new UserProfile(
    '24cfc9cc-989d-4e04-a466-267fed269623',
    'hemabato',
    'hemabato',
    'hemabato2016@gmail.com',
    '11111111111111',
    '01/01/0001',
    '01556675022'
  );

  constructor(private http:HttpClient) { }
  getUserProfile(): Observable<UserProfile> {
    return of(this.mockUser);
  }

  updateUser(user: UserProfile): Observable<UserProfile> {
    this.mockUser = { ...user };
    return of(this.mockUser);
  }
}

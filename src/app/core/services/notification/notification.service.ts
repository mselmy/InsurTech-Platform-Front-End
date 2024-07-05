import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 

  private hubConnection: signalR.HubConnection;
  private apiUrl = "http://localhost:5028/api/Notifications";


  constructor(private toastr: ToastrService,public http:HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5028/api/notificationHub') // Replace with your SignalR hub URL
      .build();

    this.hubConnection.start().catch(err => console.error(err));

    this.hubConnection.on('ReceiveNotification', (message) => {
      this.toastr.success(message, 'New Notification');
    });
  }



  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/GetNotifications`);
  }

  getNumberOfUnreadNotifications(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/NumberOfUnreadNotifications?id=${userId}`);
  }

  getHasUnreadNotifications(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/HasUnreadNotifications?id=${userId}`);
  }

  getNotificationById(notificationId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}/GetNotificationById/${notificationId}`);
  }

  getNotificationsByUserId(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/GetNotificationsByUserId/${userId}`);
  }

  markAllAsRead(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/MarkAllAsRead?userId=${userId}`, {});
  }
}

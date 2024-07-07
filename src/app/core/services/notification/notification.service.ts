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
  private userType: any | null = null; // Initialize userType to null


  // BehaviorSubject to notify components about new notifications
  private notificationSubject = new BehaviorSubject<string>('');
  notificationObservable = this.notificationSubject.asObservable();



  constructor(private toastr: ToastrService, private http: HttpClient) {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        this.userType = JSON.parse(localStorage.getItem('userData')|| "").userType; // Assign userType if present
        console.log(this.userType,userData,userDataString,JSON.parse(localStorage.getItem('userData')|| "").userType);
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
      }
    }

    

    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`http://localhost:5028/api/notificationHub?type=${this.userType}`)
    .build();
    
   
     
   
  
    this.startConnection();

    this.hubConnection.on('ReceiveNotification', (message) => {
      console.log(message);
      this.toastr.success(message, 'New Notification');
      this.notificationSubject.next(message); // Notify about the new message

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

  private async startConnection() {
    try {
       
        await this.hubConnection.start();
        console.log('SignalR connection started successfully.');
    } catch (err) {
        console.error('Error while establishing SignalR connection:', err);
    }
}
  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      const handler = (message: string) => observer.next(message);
      this.hubConnection.on('ReceiveMessage', handler);

      // Return cleanup function
      return () => {
        this.hubConnection.off('ReceiveMessage', handler);
      };
    });
  }

  sendMessage(message: string): void {
    this.hubConnection.invoke('SendMessage', message);
  }

  }



  
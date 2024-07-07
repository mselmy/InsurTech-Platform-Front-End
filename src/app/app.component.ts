import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet , RouterModule } from '@angular/router';
import { AppLayoutModule } from './features/admin-dashboard/layout/app.layout.module';
import { NotificationService } from './core/services/notification/notification.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppLayoutModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'InsurTech';
  receivedMessage: string="";

  
  constructor(private signalRService: NotificationService) {}

  ngOnInit(): void {
    // Check if user is logged in (assuming you have a method or property to check this)
    if (this.isUserLoggedIn()) {
      // Start SignalR connection
    
        this.signalRService.receiveMessage().subscribe((message) => {
          this.receivedMessage = message;
        });
    
    } else {
      console.log('User is not logged in. SignalR connection not started.');
    }
  }

  sendMessage(message: string): void {
    this.signalRService.sendMessage(message);
  }

  private isUserLoggedIn(): boolean {
   
    return localStorage.getItem('token') !== null;
  }
}
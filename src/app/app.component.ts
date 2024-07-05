import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet , RouterModule } from '@angular/router';
import { AppLayoutModule } from './features/admin-dashboard/layout/app.layout.module';
import { NotificationService } from './core/services/notification/notification.service';
import { HttpClient } from '@microsoft/signalr';
import { Observable } from 'rxjs';


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
  constructor(private notificationService: NotificationService,private http:HttpClient) { }
  
 

}
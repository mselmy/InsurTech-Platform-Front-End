import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/components/admin-dashboard/navbar/navbar.component';
import { SidebarComponent } from '../../core/components/admin-dashboard/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { RegistrationRequestsComponent } from './components/registration-requests/registration-requests.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet,
    RegistrationRequestsComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/authantication.service';
import { NotificationsComponent } from '../../../Notifications/notifications/notifications.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink,NotificationsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private auth: AuthService, private route: Router)
  {}
  logout()
  {
      this.auth.logout();
      this.route.navigate(['/']);
  }
}

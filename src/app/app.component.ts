import { Component } from '@angular/core';
import { RouterLink, RouterOutlet , RouterModule } from '@angular/router';
import { routes } from './app.routes';
import {LoginComponent} from '../app/Account/login/login.component'
import { ForgetPasswordComponent} from '../app/Account/forget-password/forget-password.component'

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent,RouterLink,RouterModule]
})
export class AppComponent {
  title = 'InsurTech-Platform-Front-End';
}

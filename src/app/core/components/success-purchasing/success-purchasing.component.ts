import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RatingModule } from 'ngx-bootstrap/rating'; // Import RatingModule from ngx-bootstrap

@Component({
  selector: 'app-success-purchasing',
  standalone: true,
  imports: [
    PanelModule,
    FormsModule, // Import FormsModule
    RatingModule, // Import RatingModule from ngx-bootstrap
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './success-purchasing.component.html',
  styleUrls: ['./success-purchasing.component.css'],
})
export class SuccessPurchasingComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  val: number = 0; // Initial value of rating
}

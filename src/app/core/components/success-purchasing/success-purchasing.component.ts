import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RatingModule } from 'ngx-bootstrap/rating'; // Import RatingModule from ngx-bootstrap
import { ButtonModule } from 'primeng/button'; // Import PrimeNG ButtonModule

@Component({
  selector: 'app-success-purchasing',
  standalone: true,
  imports: [
    FormsModule, // Import FormsModule
    RatingModule, // Import RatingModule from ngx-bootstrap
    HeaderComponent,
    FooterComponent,
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

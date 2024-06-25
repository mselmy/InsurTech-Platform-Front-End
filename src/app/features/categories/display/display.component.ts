import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
  visible: boolean = false; 
  hoverIndex: number | null = null;

  constructor(private router: Router) {}

  showHealthInsurance() {
    this.router.navigate(['/insurance/health']);
  }

  showHomeInsurance() {
    this.router.navigate(['/insurance/home']);
  }

  showMotorInsurance() {
    this.router.navigate(['/insurance/motor']);
  }

  
}

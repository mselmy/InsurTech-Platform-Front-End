import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-success-purchasing',
  standalone: true,
  imports: [
    PanelModule,
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './success-purchasing.component.html',
  styleUrl: './success-purchasing.component.css',
})
export class SuccessPurchasingComponent {}

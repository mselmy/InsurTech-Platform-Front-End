import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the scroll position is greater than 500 pixels
    this.isScrolled = window.scrollY > 60;
  }
}

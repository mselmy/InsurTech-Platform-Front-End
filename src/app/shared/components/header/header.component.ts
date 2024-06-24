import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Renderer2,
  ElementRef,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authantication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkLoginStatus();
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.authService.getUserRole().subscribe((role) => {
      this.userRole = role;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  logout(): void {
    this.authService.logout();
  }
}

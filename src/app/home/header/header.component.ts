import { CommonModule } from '@angular/common';
import { Component, HostListener,Renderer2,ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the scroll position is greater than 500 pixels
    this.isScrolled = window.scrollY > 20;
    
  }
}

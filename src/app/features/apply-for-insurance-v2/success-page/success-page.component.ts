import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent implements OnInit
{
  constructor(private router: Router) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}

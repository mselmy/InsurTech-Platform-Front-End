
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule ,CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent implements OnInit{
  faqs: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFAQs();
  }

  fetchFAQs() {
    this.http.get<any[]>('http://localhost:5028/api/FAQs')
      .subscribe(
        data => {
          this.faqs = data;
        },
        error => {
          console.error('Error fetching FAQs', error);
          
        }
      );
  }

}










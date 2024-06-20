import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service'; // Ensure this is the correct path

@Component({
  selector: 'Motorcategory',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'], // Fixed typo
})
export class SubCategoryMotorComponent implements OnInit {
  data: any[] = [];
  loading: boolean = false;

  constructor(private router: Router, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.categoriesService.getCategories('http://localhost:5028/api/MotorInsurance/GetMotorInsurance').subscribe(
      (data) => {
        this.data = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/Insurance']);
  }
}

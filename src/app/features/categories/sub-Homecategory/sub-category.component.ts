import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories.service';
@Component({
  selector: 'Homecategory',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css',
})
export class SubCategoryHomeComponent {

  constructor(private router: Router, private categoriesService: CategoriesService) {}
  data: any;

  ngOnInit() {
    this.categoriesService.getCategories('http://localhost:5028/api/HomeInsurance/GetHomeInsurance').subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }
  goBack(): void {
    this.router.navigate(['/Insurance']); 
  }

  
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { CategoriesService } from '../../Services/categories.service';
import { Categories } from '../../Model/Categories';

@Component({
  selector: 'app-get-categories',
  standalone: true,
  imports: [CommonModule, TabViewModule, BadgeModule],
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.css']
})
export class GetCategoriesComponent implements OnInit {
  categories: Categories[] | undefined;
  activeIndex: number = 0;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  getCategoryImage(categoryName: string): string {
    const categoryImages: { [key: string]: string } = {
      'HealthInsurance': '../../../../../assets/images/Medicine-rafiki.png',
      'HomeInsurance': '../../../../../assets/images/House searching-bro.png',
      'MotorInsurance': '../../../../../assets/images/Trip-bro.png',
      // Add mappings for other categories
    };
    return categoryImages[categoryName] || 'path/to/default/image.png';
  }

  onTabClick(index: number, category: Categories) {
    this.activeIndex = index;
    console.log(`Tab clicked: ${category.name}`);
    // Perform any additional logic here
  }
}

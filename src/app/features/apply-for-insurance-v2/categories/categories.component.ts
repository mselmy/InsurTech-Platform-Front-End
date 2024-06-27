import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, RouterLink, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}

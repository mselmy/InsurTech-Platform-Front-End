import { Component } from '@angular/core';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

  constructor(
    private service: ArticleService
  ) { this.service.getArticles().subscribe( data =>{
    console.log(data);
  } ) }

  getArticles() {
    return this.service.getArticles()
  }
}

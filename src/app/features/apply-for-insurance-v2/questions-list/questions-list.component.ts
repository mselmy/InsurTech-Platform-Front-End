import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [QuestionCardComponent, CommonModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css'
})
export class QuestionsListComponent implements OnInit{

  catId : number = 0;
  questionArr: any = [];

 constructor(private route: ActivatedRoute, public QuestionService: QuestionsFormService ) {}
  
 ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.catId = params['id'];
      // fill the questionArr with the questions of the category
      this.QuestionService.GetQuestiosArr(this.catId);
    });
  

  
  }
  
}

import { Component, Input, SimpleChanges, input } from '@angular/core';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
@Input() Question : any;
  answer: string = '';
constructor(public questionService: QuestionsFormService, private route: Router) {

  console.log(this.questionService.getQuestion(), "question from the service")
}
  ngOnChanges(changes: SimpleChanges): void {
    this.Question = changes['Question'].currentValue;
  }
  NextQuestion(){
    if(this.questionService.questIndex == this.questionService.questionArr.length - 1){
      // this.route.navigate(['dashboard']);
      console.log( 'answers',this.questionService.GetAnswers());
    }
    this.questionService.NextQuestion();

    this.answer = '';
  }
  PreviousQuestion(){
    this.questionService.PreviousQuestion();
    this.answer = '';
  }
  AddAnswer(){
    this.questionService.AddAnswer(this.answer);
    this.NextQuestion();
  }

}
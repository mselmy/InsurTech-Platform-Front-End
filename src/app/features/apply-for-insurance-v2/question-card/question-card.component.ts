import { Component, Input, SimpleChanges, input } from '@angular/core';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from '../../../core/models/question';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css',
})
export class QuestionCardComponent {
  @Input() question: null | Question = null;
  answer: string = '';
  constructor(
    public questionService: QuestionsFormService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.question = changes['question'].currentValue;
  }
  NextQuestion() {
    if (
      this.questionService.questIndex ==
      this.questionService.questionArr.length - 1
    ) {
      this.route.navigate(['insurancePlans']);
      // console.log('answers', this.questionService.GetAnswers());
    }
    this.questionService.NextQuestion();
    this.answer = '';
  }
  PreviousQuestion() {
    this.questionService.PreviousQuestion();
    this.answer = '';
  }
  AddAnswer() {
    if (this.answer == '' || this.question == null) {
      return;
    }
    this.questionService.AddAnswer({
      questionId: this.question.id,
      answer: this.answer,
    });
    this.NextQuestion();
  }
}

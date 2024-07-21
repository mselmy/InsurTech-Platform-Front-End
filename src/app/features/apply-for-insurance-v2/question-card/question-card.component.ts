// question-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../../core/models/question';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { Answer } from '../../../core/types/Answer';
import { QuestionType } from '../../../core/models/Home_Page/question-type.enum';
import { Adminquestions } from '../../../core/models/AdminQuestions';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule, ListboxModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit {
  manyka: Adminquestions[] | undefined;
  @Input() question: Adminquestions | undefined;
  @Input() currentIndex: number = 0;
  @Input() totalQuestions: number = 0;
  selectedValue: any;
  selectedCity: any;
  answer: string = '';

  questionTypes = QuestionType; // Import and use the enum

  constructor(private questionsFormService: QuestionsFormService) {}

  ngOnInit(): void {
    this.questionsFormService.GetQuestionsArr(1);
    this.updateQuestion();
    console.log('Current question:', this.question);
  }

  updateQuestion(): void {
    this.question = this.questionsFormService.getQuestion();
    console.log('Current question:', this.question);
    // if (this.question && this.question.options) {
    //   this.question.optionsArray = this.question.options.split(',');
    // }
  }

  getDropdownOptions(question: Adminquestions | undefined) {
    if (!question?.optionsArray) return [];
    console.log(question.optionsArray);
    return question.optionsArray.map((option) => ({
      label: option,
      value: option,
    }));
  }

  NextQuestion(): void {
    this.questionsFormService.NextQuestion();
    this.updateQuestion();
  }

  PreviousQuestion(): void {
    this.questionsFormService.PreviousQuestion();
    this.updateQuestion();
  }

  AddAnswer(): void {
    const answer: Answer = {
      questionId: this.question?.id || 0,
      answer: this.selectedValue,
    };
    this.questionsFormService.AddAnswer(answer);
    this.NextQuestion();
  }

  isNextButtonDisabled(): boolean {
    return !this.selectedValue;
  }
}

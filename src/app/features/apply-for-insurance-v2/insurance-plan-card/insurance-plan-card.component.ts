import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InsurancePlanService } from '../../../core/services/insurancePlan.service';
import { QuestionsFormService } from '../../../core/services/questions-form.service';

@Component({
  selector: 'app-insurance-plan-card',
  standalone: true,
  templateUrl: './insurance-plan-card.component.html',
  styleUrls: ['./insurance-plan-card.component.css']
})
export class InsurancePlanCardComponent {
  @Input() plan: any;
  @Input() catId: number = 0;
  showMore = false;

  constructor(
    private questionService: QuestionsFormService,
    private router: Router
  ) {}

  toggleMore() {
    this.showMore = !this.showMore;
  }

  createRequest() {
    this.router.navigate(['payment'], { state: { plan: this.plan, answers: this.questionService.GetAnswers() } });
  }
}

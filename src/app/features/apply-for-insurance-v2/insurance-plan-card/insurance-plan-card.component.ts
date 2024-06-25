import { Component, Input } from '@angular/core';
import { InsurancePlanService } from '../../../core/services/insurancePlan.service';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './insurance-plan-card.component.html',
  styleUrls: ['./insurance-plan-card.component.css']
})
export class InsurancePlanCardComponent {
  @Input() plan: any;
  @Input() catId: number = 0;
  showMore = false;
  constructor(
    private insurancePlanService: InsurancePlanService,
    private questionService: QuestionsFormService,
    private router: Router
  ) {}

  toggleMore() {
    this.showMore = !this.showMore;
  }

  createRequest() {
    this.insurancePlanService.SendRequestInsurancePlan(this.plan.id, this.questionService.GetAnswers()).subscribe({
      next: data => {
        this.router.navigate(['successpurchasing']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }}

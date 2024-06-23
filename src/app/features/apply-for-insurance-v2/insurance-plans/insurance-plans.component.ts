import { Component } from '@angular/core';
import { InsurancePlanCardComponent } from '../insurance-plan-card/insurance-plan-card.component';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-plans',
  standalone: true,
  imports: [InsurancePlanCardComponent],
  templateUrl: './insurance-plans.component.html',
  styleUrl: './insurance-plans.component.css'
})
export class InsurancePlansComponent {
  catId: number = 0;
 constructor(private questionService: QuestionsFormService, private router: Router) {
  this.catId = parseInt(sessionStorage.getItem('catId') || '0');
  console.log('catId', this.catId);
 }  
 ngOnInit(): void {
  if (this.catId == 0) {
    this.router.navigate(['apply-for-insuranceV2']);
    console.log('catId', this.catId);
  }

  
 }

}

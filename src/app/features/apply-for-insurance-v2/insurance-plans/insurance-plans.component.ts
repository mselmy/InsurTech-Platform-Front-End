import { Component } from '@angular/core';
import { InsurancePlanCardComponent } from '../insurance-plan-card/insurance-plan-card.component';
import { QuestionsFormService } from '../../../core/services/questions-form.service';
import { Router } from '@angular/router';
import { InsurancePlanService } from '../../../core/services/insurancePlan.service';
import { HomePlanCardComponent } from '../home-plan-card/home-plan-card.component';
import { HealthPlanCardComponent } from '../health-plan-card/health-plan-card.component';
import { MotorPlanCardComponent } from '../motor-plan-card/motor-plan-card.component';
import { NoInsurancePlaneComponent } from '../../../core/components/no-insurance-plane/no-insurance-plane.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-insurance-plans',
  standalone: true,
  imports: [InsurancePlanCardComponent, HomePlanCardComponent, HealthPlanCardComponent, MotorPlanCardComponent, NoInsurancePlaneComponent, HeaderComponent, FooterComponent],
  templateUrl: './insurance-plans.component.html',
  styleUrl: './insurance-plans.component.css'
})
export class InsurancePlansComponent {
  catId: number = 0;
  data: any = null;

  constructor(private questionService: QuestionsFormService, private router: Router, private insurancePlanService: InsurancePlanService) {
    this.catId = parseInt(sessionStorage.getItem('catId') || '0');
    console.log('catId', this.catId);
  }
  ngOnInit(): void {
    if (this.catId == 0) {
      this.router.navigate(['apply-for-insuranceV2']);
      console.log('catId', this.catId);
    }
    this.insurancePlanService.GetInsurancePlanByCategory(this.catId).subscribe((data) => {
      console.log('data', data);
      this.data = data;
    });


  }

}

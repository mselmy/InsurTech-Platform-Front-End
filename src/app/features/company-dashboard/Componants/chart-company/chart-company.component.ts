import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { ListInsurancePlan } from '../../Model/company/ListInsurancePlan'; 

@Component({
  selector: 'app-chart-company',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart-company.component.html',
  styleUrls: ['./chart-company.component.css'] 
})
export class ChartCompanyComponent implements OnInit, OnDestroy {
  public HealthNumberbasic: number = 0;
  public HealthNumberstandered: number = 0;
  public HealthNumberPremium: number = 0;
  public HomeNumberbasic: number = 0;
  public HomeNumberstandered: number = 0;
  public HomeNumberpreimum: number = 0;
  public MotorNumberbasic: number = 0;
  public MotorNumberstandered: number = 0;
  public MotorNumberpremium: number = 0;
  private Id: number = 1;
  subscriptions: Subscription[] = []; 
  data: any;
  options: any;

  constructor(public CompanyServices: CompanyService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.CompanyServices.GetAll(this.Id);
    this.subscriptions.push(
      this.CompanyServices.insurancePlans$.subscribe({
        next: (data: ListInsurancePlan | null) => {
          if (data) {
            this.HealthNumberbasic = this.calculateInsuranceUsers(data.healthInsurancePlans ?? [], 0);
            this.HealthNumberstandered = this.calculateInsuranceUsers(data.healthInsurancePlans ?? [], 1);
            this.HealthNumberPremium = this.calculateInsuranceUsers(data.healthInsurancePlans ?? [], 2);
            this.HomeNumberbasic = this.calculateInsuranceUsers(data.homeInsurancePlans ?? [], 0);
            this.HomeNumberstandered = this.calculateInsuranceUsers(data.homeInsurancePlans ?? [], 1);
            this.HomeNumberpreimum = this.calculateInsuranceUsers(data.homeInsurancePlans ?? [], 2);
            this.MotorNumberbasic = this.calculateInsuranceUsers(data.motorInsurancePlans ?? [], 0);
            this.MotorNumberstandered = this.calculateInsuranceUsers(data.motorInsurancePlans ?? [], 1);
            this.MotorNumberpremium = this.calculateInsuranceUsers(data.motorInsurancePlans ?? [], 2);

            this.data = {
              labels: ['Basic Level', 'Standered Level', 'Premium Level'],
              datasets: [
                {
                  label: 'Motor Insurance',
                  data: [this.MotorNumberbasic, this.MotorNumberstandered, this.MotorNumberpremium],
                  fill: false,
                  tension: 0.4,
                  borderColor: documentStyle.getPropertyValue('--green-500')
                },
                {
                  label: 'Health Insurance',
                  data: [this.HealthNumberbasic, this.HealthNumberstandered, this.HealthNumberPremium],
                  fill: false,
                  borderDash: [5, 5],
                  tension: 0.4,
                  borderColor: documentStyle.getPropertyValue('--green-900')
                },
                {
                  label: 'Home Insurance',
                  data: [this.HomeNumberbasic, this.HomeNumberstandered, this.HomeNumberpreimum],
                  fill: true,
                  borderColor: documentStyle.getPropertyValue('--green-200'),
                  tension: 0.4,
                  backgroundColor: '#f4fcf7'
                }
              ]
            };
          }
        },
        error: (error: any) => { console.log(error); } 
      })
    );

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  calculateInsuranceUsers(plans: any[], level: number): number {
    return plans.reduce((sum, plan) => {
      if (plan.level === level) {
        return sum + (plan.numberOfUsers || 0);
      }
      return sum;
    }, 0);
  }
}

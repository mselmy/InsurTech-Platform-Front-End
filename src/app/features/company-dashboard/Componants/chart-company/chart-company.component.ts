import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../Services/CompanyServices/company.service';

@Component({
  selector: 'app-chart-company',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart-company.component.html',
  styleUrl: './chart-company.component.css'
})
export class ChartCompanyComponent implements OnInit {
  public HealthNumberbasic:number=0;
  public HealthNumberstandered:number=0;
  public HealthNumberPremium:number=0;
  public HomeNumberbasic:number=0;
  public HomeNumberstandered:number=0;
  public HomeNumberpreimum:number=0;
  public MotorNumberbasic:number=0;
  public MotorNumberstandered:number=0;
  public MotorNumberpremium:number=0
  private Id: number = 1;
  sub: Subscription | null = null;
  data: any;
  options: any;

  constructor(public CompanyServices:CompanyService)
  {}
  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.LoadNumberOfInsurancePlans();
      this.data = {
          labels: ['Basic Level','Standered Level','Preimum Level'],
          datasets: [
              {
                  label: 'Motor Insurance',
                 // data: [this.MotorNumberbasic,this.MotorNumberpremium,this.MotorNumberstandered],
                 data:[20,23,45,8],
                  fill: false,
                  tension: 0.4,
                  borderColor: documentStyle.getPropertyValue('--green-500')
              },
              {
                  label: 'Health Insurance ',
                  //data: [this.HealthNumberPremium,this.HealthNumberbasic,this.HealthNumberstandered],
                  data:[23,34,8,99,33],
                  fill: false,
                  borderDash: [5, 5],
                  tension: 0.4,
                  borderColor: documentStyle.getPropertyValue('--green-900')
              },
              {
                  label: 'Home Insurance',
                 // data: [this.HomeNumberbasic,this.HomeNumberstandered,this.HomeNumberpreimum],
                 data:[23,34,68,90,7,33],
                  fill: true,
                  borderColor: documentStyle.getPropertyValue('--green-200'),
                  tension: 0.4,
                  backgroundColor: '#f4fcf7'
              }
          ]
      };
      
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

  LoadNumberOfInsurancePlans()
  {
    debugger;
    this.sub = this.CompanyServices.GetAll(this.Id).subscribe({
      next: (data) => {
        console.log(data);
        this.HealthNumberbasic = data.healthInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 0) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        
        this.HealthNumberstandered== data.healthInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 1) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.HealthNumberPremium== data.healthInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 2) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.HomeNumberbasic = data.homeInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 0) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.HomeNumberstandered =data.homeInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 1) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.HomeNumberpreimum =data.homeInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 2) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.MotorNumberbasic = data.motorInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 0) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.MotorNumberstandered =data.motorInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 1) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
        this.MotorNumberpremium =data.motorInsurancePlans?.reduce((sum, plan) => {
          if (plan.level == 2) {
            return sum + (plan.numberOfUsers || 0);
          }
          return sum;
        }, 0) ?? 0;
      },
      error: (error) => { console.log(error) }
    });
  }
}

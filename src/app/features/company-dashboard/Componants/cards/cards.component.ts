import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit,OnDestroy {
  public HealthNumber: number=0;
  public HomeNmber: number=0;
  public MotorNumber:  number=0;
  public RequestNumber:number=0;
  private Id: number = 1;
  sub: Subscription | null = null;
  constructor(public CompanyServices: CompanyService){}

  ngOnInit(): void {
    debugger;
    this.sub = this.CompanyServices.GetAll(this.Id).subscribe(
      {
        next: (data) => {
          this.RequestNumber=0;
          this.HealthNumber = data.healthInsurancePlans?.length??0;
          this.HomeNmber = data.homeInsurancePlans?.length??0;
          this.MotorNumber = data.motorInsurancePlans?.length??0;

          this.RequestNumber += data.healthInsurancePlans?.reduce((sum, plan) => sum + (plan.numberOfUsers || 0), 0) ?? 0;
          this.RequestNumber += data.homeInsurancePlans?.reduce((sum, plan) => sum + (plan.numberOfUsers || 0), 0) ?? 0;
          this.RequestNumber += data.motorInsurancePlans?.reduce((sum, plan) => sum + (plan.numberOfUsers || 0), 0) ?? 0;
        },
        error: (error) => { console.log(error) }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe;
  }

}

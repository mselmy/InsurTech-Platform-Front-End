import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { Subscription } from 'rxjs';
import { HealthInsurancePlan } from '../../Model/company/HealthInsurancePlan';
import { HomeInsurancePlan } from '../../Model/company/HomeInsurancePlan';
import { MotorInsurancePlan } from '../../Model/company/MotorInsurancePlan';
import { ConfirmationService, MessageService } from 'primeng/api'
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AvatarModule } from 'primeng/avatar';
import {MotorinsuranceComponent} from '../Motorinsurance/motorinsurance/motorinsurance.component'
import { HealthinsuranceComponent } from '../Helathinsurance/healthinsurance/healthinsurance.component';
import { HomeinsuranceComponent } from '../Homeinsurance/homeinsurance/homeinsurance.component';
import { EditHealthInsurancePlanComponent } from '../Helathinsurance/edithealthinsurance/edithealthinsurance.component';
import { EdithomeinsuranceComponent } from '../Homeinsurance/edithomeinsurance/edithomeinsurance.component';
import { EditmotorinsuranceComponent } from '../Motorinsurance/editmotorinsurance/editmotorinsurance.component';
import { EditMotorInsurance } from '../../Model/Motorinsurance/edit-motor-insurance';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-list-insurance-plan',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, RippleModule, ButtonModule,
    ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, DropdownModule, TagModule,
    InputTextModule, InputNumberModule, FormsModule, RippleModule,AvatarModule,MotorinsuranceComponent,
    HealthinsuranceComponent,HomeinsuranceComponent,EditHealthInsurancePlanComponent,EdithomeinsuranceComponent,
    EditmotorinsuranceComponent,RouterLink],
  providers: [MessageService, ConfirmationService],
  templateUrl: './list-insurance-plan.component.html',
  styleUrls: ['./list-insurance-plan.component.css']
})
export class ListInsurancePlanComponent implements OnInit, OnDestroy {
  public HealthList: HealthInsurancePlan[] = [];
  public HomeList: HomeInsurancePlan[] = [];
  public MotorList: MotorInsurancePlan[] = [];
  visible: boolean = false;
  VisibleEdit:boolean=false;

  public flag: number = 1;
  private Id: number = 1;
  sub: Subscription | null = null;
  selectedInsurance: EditMotorInsurance=new EditMotorInsurance(0,0,0,0,"",0,0,0,0,0); 


  constructor(
    private CompanyServices: CompanyService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.laodData();
  }
  laodData() {
    this.sub = this.CompanyServices.GetAll(this.Id).subscribe({
      next: (data) => {
        console.log(data);
        this.HealthList = data.healthInsurancePlans || [];
        this.HomeList = data.homeInsurancePlans || [];
        this.MotorList = data.motorInsurancePlans || [];

      },
      error: (error) => { console.log(error) }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  click(name: string) {
    switch (name) {
      case "Motor": this.flag = 1; break;
      case "health": this.flag = 2; break;
      case "home": this.flag = 3; break;
    }
    var element = document.getElementById(name);
    if (element) {
      const elements = document.querySelectorAll(".col");
      elements.forEach(el => {
        this.renderer.removeStyle(el, 'background-color');
      });
      this.renderer.setStyle(element, 'background-color', '#f9f9f9');
    } else {
      console.error(`Element with id ${name} not found`);
    }
  }

  editMotorInsurance(plan: MotorInsurancePlan) {
   this.selectedInsurance.id=plan.id;
   this.selectedInsurance.legalExpenses=plan.legalExpenses
   this.selectedInsurance.level=plan.level
   this.selectedInsurance.ownDamage=plan.ownDamage
   this.selectedInsurance.personalAccident=plan.personalAccident
   this.selectedInsurance.quotation=plan.quotation
   this.selectedInsurance.theft=plan.theft
   this.selectedInsurance.thirdPartyLiability=plan.thirdPartyLiability
   this.selectedInsurance.yearlyCoverage=plan.yearlyCoverage
   this.VisibleEdit=true;

  }

  deleteInsurance(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete This plan?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.CompanyServices.Delete(id).subscribe({
          next:(data)=>{this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Insurance plan Deleted' });
          if(this.flag==1){this.MotorList = this.MotorList.filter(insurance => insurance.id !== id);}
          else if(this.flag==2){this.HealthList = this.HealthList.filter(insurance => insurance.id !== id);}
          else{this.HomeList = this.HomeList.filter(insurance => insurance.id !== id);}
        },
          error:(error)=>{ this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'An Error occured' });
        }
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
    });
  }

  editHealthInsurance(id: number) {
    console.log("edit health");
  }

  editHomeInsurance(id: number) {
    console.log("edit home");
  }

  showDialog() {
    this.visible = true;
}
}
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditMotorInsurance } from '../../../Model/Motorinsurance/edit-motor-insurance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MotorinsuranceService } from '../../../Services/ManageMotorServices/motorinsurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePlanLevel } from '../../../Model/Motorinsurance/add-motor-insurance';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editmotorinsurance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editmotorinsurance.component.html',
  styleUrl: './editmotorinsurance.component.css'
})
export class EditmotorinsuranceComponent implements OnInit, OnDestroy {
  public EditObj: EditMotorInsurance = new EditMotorInsurance(0, 0, 0, 0, "", 0, 0, 0, 0, 0);
  Editmotorform!: FormGroup;
  sub!: Subscription;
  InsurancePlanLevel = InsurancePlanLevel;
  comanyId:string="57164a6c-e3b4-4ab5-8fd6-18fe3d29e68a";
  constructor(
    public motorservices: MotorinsuranceService,
    public activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(param => {
      this.motorservices.getById(param['id']).subscribe(
        {
          next: (data) => {
            debugger;

            this.EditObj = data;
            console.log('Motor insurance fetched successfully', data);
            this.updateFormWithData(data);
          },
          error: (error) => {
            console.error('Error fetching Motor insurance', error);
          }
        }
      );
    });



    this.Editmotorform = new FormGroup({
      yearlyCoverage: new FormControl(this.EditObj.yearlyCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      level: new FormControl(this.EditObj.level, [Validators.required]),
      quotation: new FormControl(this.EditObj.quotation, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      personalAccident: new FormControl(this.EditObj.personalAccident, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      theft: new FormControl(this.EditObj.theft, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      thirdPartyLiability: new FormControl(this.EditObj.thirdPartyLiability, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      ownDamage: new FormControl(this.EditObj.ownDamage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      legalExpenses: new FormControl(this.EditObj.legalExpenses, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)])
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateFormWithData(data: any): void {
    // Patch the form controls with the data
    this.Editmotorform.patchValue({
      yearlyCoverage: data.yearlyCoverage,
      level: data.level,
      quotation: data.quotation,
      personalAccident: data.personalAccident,
      theft: data.theft,
      thirdPartyLiability: data.thirdPartyLiability,
      ownDamage: data.ownDamage,
      legalExpenses: data.legalExpenses
    });
  }

  EditMotor(): void {
    debugger;
    if (this.Editmotorform.valid) {
      const formValue = this.Editmotorform.value;
      const homeObj: EditMotorInsurance = new EditMotorInsurance(
        this.EditObj.id,
        formValue.yearlyCoverage,
        formValue.level,
        formValue.quotation,
        this.comanyId,
        formValue.personalAccident,
        formValue.theft,
        formValue.thirdPartyLiability,
        formValue.ownDamage,
        formValue.legalExpenses
      );

      console.log('Payload:', homeObj); // Log the payload to verify
      this.motorservices.edit(homeObj).subscribe(
        {
          next: (data) => {
            console.log('Motor insurance updated successfully', data);
            this.Editmotorform.reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Motor insurance updated successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['']);

          },
          error: (error) => {
            console.error('Error updating Motor insurance', error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error updating Home insurance",
              text: error.message,
              showConfirmButton: true
            });
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}


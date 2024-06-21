import { Component, OnDestroy,Input, OnInit } from '@angular/core';
import { EditHomeInsurance } from '../../../Model/Homeinsurance/edit-home-insurance';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HomeinsuranceService } from '../../../Services/ManageHomeServices/homeinsurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InsurancePlanLevel } from '../../../Model/Homeinsurance/add-home-insurance';

@Component({
  selector: 'app-edithomeinsurance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edithomeinsurance.component.html',
  styleUrls: ['./edithomeinsurance.component.css']
})
export class EdithomeinsuranceComponent implements OnInit, OnDestroy {
  public EditObj: EditHomeInsurance = new EditHomeInsurance(0, 0, 0, 0, "", 0, 0, 0, 0, 0);
  Edithomeform!: FormGroup;
  sub!: Subscription;
  InsurancePlanLevel = InsurancePlanLevel;
  comanyId:string="1";


  constructor(
    public homeservices: HomeinsuranceService,
    public activateRoute: ActivatedRoute,
    public router:Router) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(param => {
      this.homeservices.getById(param['id']).subscribe(
        {
          next: (data) => {
            debugger;

            this.EditObj = data;
            console.log('Home insurance fetched successfully', data);
            this.updateFormWithData(data);
          },
          error: (error) => {
            console.error('Error fetching home insurance', error);
          }
        }
      );
    });

    this.Edithomeform = new FormGroup({
      yearlyCoverage: new FormControl(this.EditObj.yearlyCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      level: new FormControl(this.EditObj.level, [Validators.required]),
      quotation: new FormControl(this.EditObj.quotation, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      glassBreakage: new FormControl(this.EditObj.glassBreakage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      attemptedTheft: new FormControl(this.EditObj.attemptedTheft, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      firesAndExplosion: new FormControl(this.EditObj.firesAndExplosion, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      naturalHazard: new FormControl(this.EditObj.naturalHazard, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      waterDamage: new FormControl(this.EditObj.waterDamage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)])
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateFormWithData(data: any): void {
    // Patch the form controls with the data
    this.Edithomeform.patchValue({
      yearlyCoverage: data.yearlyCoverage,
      level: data.level,
      quotation: data.quotation,
      waterDamage: data.waterDamage,
      glassBreakage: data.glassBreakage,
      naturalHazard: data.naturalHazard,
      attemptedTheft: data.attemptedTheft,
      firesAndExplosion: data.firesAndExplosion
    });
  }

  EditHealth(): void {
    debugger;
    if (this.Edithomeform.valid) {
      const formValue = this.Edithomeform.value;
      const homeObj: EditHomeInsurance = new EditHomeInsurance(
        this.EditObj.id,
        formValue.yearlyCoverage,
        formValue.level,
        formValue.quotation,
        this.comanyId,
        formValue.waterDamage,
        formValue.glassBreakage,
        formValue.naturalHazard,
        formValue.attemptedTheft,
        formValue.firesAndExplosion
      );

      console.log('Payload:', homeObj); // Log the payload to verify
      this.homeservices.edit(homeObj).subscribe(
        {
          next: (data) => {
            console.log('Home insurance updated successfully', data);
            this.Edithomeform.reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Home insurance updated successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['']);

          },
          error: (error) => {
            console.error('Error updating Home insurance', error);
            Swal.fire({
              position: "top-end",
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


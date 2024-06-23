import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthinsuranceService } from '../../../Services/ManageHealthServices/healthinsurance.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditHealthInsurance, InsurancePlanLevel } from '../../../Model/Helathinsurance/edit-health-insurance';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-health-insurance-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edithealthinsurance.component.html',
  styleUrls: ['./edithealthinsurance.component.css']
})
export class EditHealthInsurancePlanComponent implements OnInit, OnDestroy {
  public EditObj: EditHealthInsurance = new EditHealthInsurance(0,0, 0, 0, "", "", 0, 0, 0, 0);
  Edithealthform!: FormGroup;
  sub!: Subscription;
  InsurancePlanLevel = InsurancePlanLevel; 
  comanyId:string="1cd5e747-279c-4c59-87a5-58773367181f";

  constructor(
    public healthService: HealthinsuranceService,
    public activateRoute: ActivatedRoute,
  public router:Router) {}

  ngOnInit(): void {
    
    this.sub = this.activateRoute.params.subscribe(param => {
      this.healthService.getById(param['id']).subscribe(
        {
          next: (data) => {
            debugger;

            this.EditObj = data;
            console.log('Health insurance fetched successfully', data);
            this.updateFormWithData(data); // Update form with fetched data
          },
          error: (error) => {
            console.error('Error fetching health insurance', error);
          }
        }
      );
    });
    this.Edithealthform = new FormGroup({
      yearlyCoverage: new FormControl(this.EditObj.yearlyCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      level: new FormControl(this.EditObj.level, [Validators.required]),
      quotation: new FormControl(this.EditObj.quotation, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      medicalNetwork: new FormControl(this.EditObj.medicalNetwork, [Validators.required]),
      clinicsCoverage: new FormControl(this.EditObj.clinicsCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      hospitalizationAndSurgery: new FormControl(this.EditObj.hospitalizationAndSurgery, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      opticalCoverage: new FormControl(this.EditObj.opticalCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
      dentalCoverage: new FormControl(this.EditObj.dentalCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)])
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateFormWithData(data: any): void {
    // Patch the form controls with the data
    this.Edithealthform.patchValue({

      yearlyCoverage: data.yearlyCoverage,
      level: data.level,
      quotation: data.quotation,
      medicalNetwork: data.medicalNetwork,
      clinicsCoverage: data.clinicsCoverage,
      hospitalizationAndSurgery: data.hospitalizationAndSurgery,
      opticalCoverage: data.opticalCoverage,
      dentalCoverage: data.dentalCoverage
    });
  }

  EditHealth() {
    if (this.Edithealthform.valid) {
      debugger;

      const formValue = this.Edithealthform.value;
      const healthObj: EditHealthInsurance = new EditHealthInsurance(
        this.EditObj.id,
        formValue.yearlyCoverage,
        formValue.level,
        formValue.quotation,
        this.comanyId,
        formValue.medicalNetwork,
        formValue.clinicsCoverage,
        formValue.hospitalizationAndSurgery,
        formValue.opticalCoverage,
        formValue.dentalCoverage
      );

      console.log('Payload:', healthObj); // Log the payload to verify
      this.healthService.edit(healthObj).subscribe(
        {
          next:(data) => {
            console.log('Health insurance updated successfully', data);
            this.Edithealthform.reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Health insurance updated successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/dashboard']);

            
          },
          error:(error) => {
            console.error('Error updating health insurance', error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error updating health insurance",
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



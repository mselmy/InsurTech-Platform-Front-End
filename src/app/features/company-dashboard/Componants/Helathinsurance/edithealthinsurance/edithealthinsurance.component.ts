import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthinsuranceService } from '../../../Services/ManageHealthServices/healthinsurance.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class EditHealthInsurancePlanComponent implements OnChanges, OnDestroy {
  @Input() healthInsuranceData?: EditHealthInsurance;

  public EditObj: EditHealthInsurance = new EditHealthInsurance(0,0, 0, 0, "", "", 0, 0, 0, 0);
  Edithealthform!: FormGroup;
  sub!: Subscription;
  InsurancePlanLevel = InsurancePlanLevel; 
  comanyId: string = JSON.parse(localStorage.getItem('userData') || "{}").id;

  constructor(    
    private fb: FormBuilder,
    public healthService: HealthinsuranceService,
    public activateRoute: ActivatedRoute,
  public router:Router) {}

  // ngOnInit(): void {
    
  //   this.sub = this.activateRoute.params.subscribe(param => {
  //     this.healthService.getById(param['id']).subscribe(
  //       {
  //         next: (data) => {
  //           debugger;

  //           this.EditObj = data;
  //           console.log('Health insurance fetched successfully', data);
  //           this.updateFormWithData(data); // Update form with fetched data
  //         },
  //         error: (error) => {
  //           console.error('Error fetching health insurance', error);
  //         }
  //       }
  //     );
  //   });
  //   this.Edithealthform = new FormGroup({
  //     yearlyCoverage: new FormControl(this.EditObj.yearlyCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
  //     level: new FormControl(this.EditObj.level, [Validators.required]),
  //     quotation: new FormControl(this.EditObj.quotation, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
  //     medicalNetwork: new FormControl(this.EditObj.medicalNetwork, [Validators.required]),
  //     clinicsCoverage: new FormControl(this.EditObj.clinicsCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
  //     hospitalizationAndSurgery: new FormControl(this.EditObj.hospitalizationAndSurgery, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
  //     opticalCoverage: new FormControl(this.EditObj.opticalCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)]),
  //     dentalCoverage: new FormControl(this.EditObj.dentalCoverage, [Validators.required, Validators.min(0), Validators.max(1.7976931348623157e+308)])
  //   });
  // }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['healthInsuranceData'] && this.healthInsuranceData) {
      this.initializeForm();
    }
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initializeForm(): void {
    // Patch the form controls with the data
    this.Edithealthform=this.fb.group({
      yearlyCoverage: [this.healthInsuranceData?.yearlyCoverage || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      level: [this.healthInsuranceData?.level || InsurancePlanLevel.Basic, [Validators.required]],
      quotation: [this.healthInsuranceData?.quotation || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      medicalNetwork: [this.healthInsuranceData?.medicalNetwork || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      clinicsCoverage: [this.healthInsuranceData?.clinicsCoverage || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      hospitalizationAndSurgery: [this.healthInsuranceData?.hospitalizationAndSurgery || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      opticalCoverage: [this.healthInsuranceData?.opticalCoverage || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      dentalCoverage: [this.healthInsuranceData?.dentalCoverage || '', [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]]
    });

   
  }

  EditHealth() {
    if (this.Edithealthform.valid) {
      debugger;

      const formValue = this.Edithealthform.value;
      const healthObj: EditHealthInsurance = new EditHealthInsurance(
        this.healthInsuranceData?.id ||0,
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
              position: "top-end",
              icon: "success",
              title: "Health insurance updated successfully",
              showConfirmButton: false,
              timer: 1000
            });
            // this.router.navigate(['/dashboard']);
            setTimeout(() => {
              this.router.navigate(['company']).then(() => {
                window.location.reload();
              });
            }, 1500);
            
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



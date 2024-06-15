import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Config } from 'datatables.net-dt';
import 'datatables.net-responsive';
import Swal from 'sweetalert2';
import { Company } from '../../../../core/models/company';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
import { data } from 'jquery';
import { RegistrationRequestsServiceService } from '../../../../core/services/registration-requests.service';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-requests',
  standalone: true,
  imports: [
    DataTablesModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  animations: [appModuleAnimation()],
  templateUrl: './registration-requests.component.html',
  styleUrl: './registration-requests.component.css'
})
export class RegistrationRequestsComponent {
faEdit = faEdit;
faCheck = faCheck;
faTimes = faTimes;

  dtOptions: Config = {};
  companies: Company[] = [];
  newRequestCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;
  

constructor(private router: Router, private service : RegistrationRequestsServiceService) { }
  ngOnInit(): void {

    this.service.GetAll().subscribe((data:any) => {
      this.companies = data.result.items;
      this.newRequestCount = this.companies.filter(x => x.status === 2).length;
      this.approvedCount = this.companies.filter(x => x.status === 1).length;
      this.rejectedCount = this.companies.filter(x => x.status === 0).length;
      });

    this.dtOptions = {
      columnDefs: [
        { orderable: false, targets: -1 }, // Disables sorting on the last column
        // make text align to left for all columns
        { className: 'dt-left', targets: '_all' }
      ],
      responsive: true
    };

  }

  AcceptRequest(id: number){
    this.service.ApproveRequest(id).subscribe((data:any) => {});
  }

  RejectRequest(id: number){
    this.service.RejectRequest(id).subscribe((data:any) => {});
  }

  SwitchRequestStatus(id: number){
    this.service.GetById(id).subscribe((data:any) => {
      if(data.result.status === 1){
        this.RejectRequest(id);
      } else {
        this.AcceptRequest(id);
      }
    });
  }

  showApproveAlert(id:number) {
    Swal.fire({
      title: "Approve Request",
      text: "Are you sure you want to approve this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.AcceptRequest(id);
        Swal.fire({
          title: "Approved!",
          text: "The request has been approved.",
          icon: "success"
        });
      }
    });
    // refresh the company list
    this.service.GetAll().subscribe((data:any) => {
      this.companies = data.result.items;
    });
  }

  showDeclineAlert(id:number) {
    Swal.fire({
      title: "Decline Request",
      text: "Are you sure you want to decline this request?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.RejectRequest(id);
        Swal.fire({
          title: "Declined!",
          text: "The request has been declined.",
          icon: "success"
        });
      }
    });
    // refresh the company list
    this.service.GetAll().subscribe((data:any) => {
      this.companies = data.result.items;
    });
  }

  showSwitchAlert(id:number) {
    Swal.fire({
      title: "Switch Request Status",
      text: "Are you sure you want to switch the status of this request?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.SwitchRequestStatus(id);
        Swal.fire({
          title: "Status Switched!",
          text: "The request status has been switched.",
          icon: "success"
        });
      }
    });
    // refresh the company list
    this.service.GetAll().subscribe((data:any) => {
      this.companies = data.result.items;
    });
  }

}

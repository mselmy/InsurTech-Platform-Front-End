import { Component, OnInit } from '@angular/core';
import { UserInquireService,UserInquire } from '../../core/services/Users Inquiries Service/user-inquire.service';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var bootstrap: any;

@Component({
  selector: 'app-users-inquiries',
  standalone: true,
  imports: [CommonModule,  FormsModule], 
  templateUrl: './users-inquiries.component.html',
  styleUrls: ['./users-inquiries.component.css']
})
export class UsersInquiriesComponent implements OnInit {
  
//   inquiries: UserInquire[] = [];
//   filteredInquiries: UserInquire[] = [];
//   loading: boolean = true;

//   filterEmail: string = '';
//   filterContent: string = '';
//   filterDate: string = '';
//   filterIsRead: string = '';

//   constructor(private userInquireService: UserInquireService) {}

//   ngOnInit() {
//     this.loadInquiries();
//   }

//   loadInquiries() {
//     this.loading = true;
//     this.userInquireService.getUserInquiries().subscribe(
//       (data) => {
//         this.inquiries = data;
//         this.filteredInquiries = data;
//         this.loading = false;
//       },
//       (error) => {
//         console.error('Error fetching inquiries', error);
//         this.loading = false;
//       }
//     );
//   }

//   clear() {
//     this.filterEmail = '';
//     this.filterContent = '';
//     this.filterDate = '';
//     this.filterIsRead = '';
//     this.applyFilters();
//   }

//   applyFilters() {
//     this.filteredInquiries = this.inquiries.filter(inquiry => {
//       const inquiryDate = new Date(inquiry.date).toISOString().split('T')[0];
//       const filterDate = this.filterDate ? new Date(this.filterDate).toISOString().split('T')[0] : '';

//       return (
//         (!this.filterEmail || inquiry.email.includes(this.filterEmail)) &&
//         (!this.filterContent || inquiry.content.includes(this.filterContent)) &&
//         (!this.filterDate || inquiryDate === filterDate) &&
//         (!this.filterIsRead || (this.filterIsRead === 'true' ? inquiry.isRead : !inquiry.isRead))
//       );
//     });
//   }

//   filterByEmail(event: Event) {
//     this.filterEmail = (event.target as HTMLInputElement).value;
//     this.applyFilters();
//   }

//   filterByContent(event: Event) {
//     this.filterContent = (event.target as HTMLInputElement).value;
//     this.applyFilters();
//   }

//   filterByDate(event: Event) {
//     this.filterDate = (event.target as HTMLInputElement).value;
//     this.applyFilters();
//   }

//   filterByRead(event: Event) {
//     this.filterIsRead = (event.target as HTMLInputElement).value;
//     this.applyFilters();
//   }
// }

inquiries: UserInquire[] = [];
filteredInquiries: UserInquire[] = [];
loading: boolean = true;
modalTitle: string = '';
modalContent: string = '';

filterEmail: string = '';
filterContent: string = '';
filterDate: string = '';
filterIsRead: string = '';

constructor(private userInquireService: UserInquireService, private modalService: NgbModal) {}

ngOnInit() {
  this.loadInquiries();
}

loadInquiries() {
  this.loading = true;
  this.userInquireService.getUserInquiries().subscribe(
    (data) => {
      this.inquiries = data;
      this.filteredInquiries = data;
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching inquiries', error);
      this.loading = false;
    }
  );
}

clear() {
  this.filterEmail = '';
  this.filterContent = '';
  this.filterDate = '';
  this.filterIsRead = '';
  this.applyFilters();
}

applyFilters() {
  this.filteredInquiries = this.inquiries.filter(inquiry => {
    const inquiryDate = new Date(inquiry.date).toISOString().split('T')[0];
    const filterDate = this.filterDate ? new Date(this.filterDate).toISOString().split('T')[0] : '';

    return (
      (!this.filterEmail || inquiry.email.includes(this.filterEmail)) &&
      (!this.filterContent || inquiry.content.includes(this.filterContent)) &&
      (!this.filterDate || inquiryDate === filterDate) &&
      (!this.filterIsRead || (this.filterIsRead === 'true' ? inquiry.isRead : !inquiry.isRead))
    );
  });
}

filterByEmail(event: Event) {
  this.filterEmail = (event.target as HTMLInputElement).value;
  this.applyFilters();
}

filterByContent(event: Event) {
  this.filterContent = (event.target as HTMLInputElement).value;
  this.applyFilters();
}

filterByDate(event: Event) {
  this.filterDate = (event.target as HTMLInputElement).value;
  this.applyFilters();
}

filterByRead(event: Event) {
  this.filterIsRead = (event.target as HTMLInputElement).value;
  this.applyFilters();
}

openModal(inquiry: UserInquire) {
  this.modalTitle = inquiry.email;
  this.modalContent = inquiry.content;
  const modalElement = document.getElementById('contentModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
}
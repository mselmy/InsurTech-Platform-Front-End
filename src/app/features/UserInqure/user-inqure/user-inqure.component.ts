import { Component, OnInit } from '@angular/core';
import { UserInquireService , UserInquire } from '../../../core/services/Users Inquiries Service/user-inquire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-user-inquire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-inqure.component.html',
  styleUrls: ['./user-inqure.component.css']
})
export class UserInquireComponent  implements OnInit{
  inquiry: UserInquire = {
    email: '',
    content: '',
    date: new Date(),
    isRead: false
  };

  constructor(private userInquireService: UserInquireService) {}

  ngOnInit() {
    this.getEmailFromLocalStorage();
  }

  getEmailFromLocalStorage() {
    const user = localStorage.getItem('userData');
    if (user) {
      const userData = JSON.parse(user);
      this.inquiry.email = userData.email;
    }
  }

  submitInquiry() {
    this.inquiry.date = new Date();
    this.userInquireService.addUserInquiry(this.inquiry).subscribe(response => {
      console.log('Inquiry submitted', response);
      // Optionally, you can add code here to update the admin component
      // by sending a message through a shared service or using another method
    }, error => {
      console.error('Error submitting inquiry', error);
    });
  }
}
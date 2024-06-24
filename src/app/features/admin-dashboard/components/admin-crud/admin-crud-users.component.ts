import { Component, OnInit } from '@angular/core';
import { UserService } from '../../layout/service/crud-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-admin-crud-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
  ],
  templateUrl: './admin-crud-users.component.html',
  styleUrls: ['./admin-crud-users.component.css'],
})
export class AdminCrudUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  activeTab: string = 'customers'; // Default active tab

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filterUsers(); // Initialize filteredUsers
    });
  }

  getUserType(userType: number) {
    return userType === 1 ? 'company' : 'customer';
  }

  filterUsers() {
    let filtered = this.users;
    if (this.searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredUsers = filtered.filter((user) =>
      this.activeTab === 'customers' ? user.userType === 0 : user.userType === 1
    );
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.filterUsers();
  }

  editUser(user: any) {
    Swal.fire({
      title: 'Edit User',
      text: `Editing user: ${user.name}`,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  }

  deleteUser(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement delete user logic here
        Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });
  }

  viewUser(user: any) {
    Swal.fire({
      title: 'User Details',
      html: `<strong>Name:</strong> ${user.name}<br>
             <strong>Username:</strong> ${user.userName}<br>
             <strong>Email:</strong> ${user.email}<br>
             <strong>Phone Number:</strong> ${user.phoneNumber}<br>
             <strong>User Type:</strong> ${this.getUserType(user.userType)}`,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  }
}

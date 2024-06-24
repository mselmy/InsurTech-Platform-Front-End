import { Component, OnInit } from '@angular/core';
import { UserService } from '../../layout/service/crud-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-crud-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './admin-crud-users.component.html',
  styleUrls: ['./admin-crud-users.component.css'],
})
export class AdminCrudUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initialize filteredUsers
    });
  }

  getUserType(userType: number) {
    return userType === 1 ? 'company' : 'customer';
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../layout/service/crud-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-crud-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-crud-users.component.html',
  styleUrl: './admin-crud-users.component.css',
})
export class AdminCrudUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  getUserType(userType: number) {
    return userType === 1 ? 'company' : 'customer';
  }
}

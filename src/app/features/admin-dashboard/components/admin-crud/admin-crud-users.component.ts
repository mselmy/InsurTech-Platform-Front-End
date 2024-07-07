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
import { User, Company } from './iuserType'; // Import the user types
import { NotificationsComponent } from '../../../Notifications/notifications/notifications.component';

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
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  activeTab: string = 'customers'; // Default active tab

  constructor(private userService: UserService) {}

  ngOnInit() {
    const observer = {
      next: (data: User[]) => {
        this.users = data;
        this.filterUsers(); // Initialize filteredUsers
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
        Swal.fire('Error', 'Failed to fetch users.', 'error');
      },
    };

    this.userService.getUsers().subscribe(observer);
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

  editUser(user: User) {
    const htmlContent = `
      <input id="swal-input1" class="swal2-input" placeholder="Name" value="${
        user.name
      }">
      <input id="swal-input2" class="swal2-input" placeholder="Username" value="${
        user.userName
      }">
      <input id="swal-input3" class="swal2-input" placeholder="Email" value="${
        user.email
      }">
      ${
        user.userType === 1
          ? `<input id="swal-input4" class="swal2-input" placeholder="Tax Number" value="${
              (user as Company).taxNumber
            }">
                              <input id="swal-input5" class="swal2-input" placeholder="Location" value="${
                                (user as Company).location
                              }">`
          : ''
      }
      <input id="swal-input6" class="swal2-input" placeholder="Phone Number" value="${
        user.phoneNumber
      }">`;

    Swal.fire({
      title: 'Edit User',
      html: htmlContent,
      focusConfirm: false,
      preConfirm: () => {
        const updatedUser: Partial<User> = {
          id: user.id,
          name: (document.getElementById('swal-input1') as HTMLInputElement)
            .value,
          userName: (document.getElementById('swal-input2') as HTMLInputElement)
            .value,
          email: (document.getElementById('swal-input3') as HTMLInputElement)
            .value,
          phoneNumber: (
            document.getElementById('swal-input6') as HTMLInputElement
          ).value,
          userType: user.userType,
        };
        if (user.userType === 1) {
          (updatedUser as Company).taxNumber = (
            document.getElementById('swal-input4') as HTMLInputElement
          ).value;
          (updatedUser as Company).location = (
            document.getElementById('swal-input5') as HTMLInputElement
          ).value;
        }
        return updatedUser;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const observer = {
          next: () => {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              this.users[index] = result.value as User;
              this.filterUsers();
              Swal.fire('Updated!', 'Your user has been updated.', 'success');
            }
          },
          error: (error: any) => {
            console.error('Error updating user:', error);
            Swal.fire(
              'Error!',
              'There was an error updating the user.',
              'error'
            );
          },
        };
        this.userService
          .editUser(result.value as User, user.userType)
          .subscribe(observer);
      }
    });
  }

  deleteUser(user: User) {
    console.log('Deleting user with ID:', user.id);
    console.log('User type:', user.userType);

    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const observer = {
          next: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.filterUsers();
            Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
          },
          error: (error: any) => {
            console.error('Error deleting user:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the user.',
              'error'
            );
          },
        };

        this.userService.deleteUser(user.id, user.userType).subscribe(observer);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your user is safe :)', 'error');
      }
    });
  }

  viewUser(user: User) {
    let details = `<strong>Name:</strong> ${user.name}<br>
                   <strong>Username:</strong> ${user.userName}<br>
                   <strong>Email:</strong> ${user.email}<br>
                   <strong>Phone Number:</strong> ${user.phoneNumber}<br>
                   <strong>User Type:</strong> ${this.getUserType(
                     user.userType
                   )}`;

    if (user.userType === 1) {
      const company = user as Company;
      details += `<br><strong>Tax Number:</strong> ${company.taxNumber}<br>
                  <strong>Location:</strong> ${company.location}`;
    }

    Swal.fire({
      title: 'User Details',
      html: details,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  }
}

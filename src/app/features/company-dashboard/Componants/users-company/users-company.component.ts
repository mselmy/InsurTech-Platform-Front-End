import { Component, OnInit } from '@angular/core';
import { CompanyUsers } from '../../Model/company/CompanyUser';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-users-company',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './users-company.component.html',
  styleUrls: ['./users-company.component.css']
})
export class UsersCompanyComponent implements OnInit {

 public UsersList: CompanyUsers[] = [];
  Id = JSON.parse(localStorage.getItem('userData') || '{id: 1}').id;
  searchQuery = '';
  filteredUsersList = this.UsersList;

  filterUsers() {
    this.filteredUsersList = this.UsersList.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      user.phone.includes(this.searchQuery)
    );
  } 

  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.GetCompanyUsers(this.Id).subscribe(
      {
        next: (data) => {
          this.UsersList = data; 
        }
      }
    );
  }
}

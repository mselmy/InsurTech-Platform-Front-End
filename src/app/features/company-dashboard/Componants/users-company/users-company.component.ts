import { Component, OnInit } from '@angular/core';
import { CompanyUsers } from '../../Model/company/CompanyUser';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users-company',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './users-company.component.html',
  styleUrls: ['./users-company.component.css']
})
export class UsersCompanyComponent implements OnInit {
  // UsersList: CompanyUsers[] = [
  //   { name: "tamer", email: "t@email.com", phone: "01234567" },
  //   { name: "tamer", email: "t@email.com", phone: "01234567" },
  //   { name: "tasneime", email: "t@email.com", phone: "01234567" },
  //   { name: "raniewm", email: "t@email.com", phone: "01234567" },
  //   { name: "fawzy", email: "t@email.com", phone: "01234567" },
  //   { name: "maysa", email: "t@email.com", phone: "01234567" }
  // ];

 public UsersList: CompanyUsers[] = [];
  Id = JSON.parse(localStorage.getItem('userData') || '{id: 1}').id; 

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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyUsers } from '../../Model/company/CompanyUser';
import { CompanyService } from '../../Services/CompanyServices/company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-company.component.html',
  styleUrls: ['./users-company.component.css']
})
export class UsersCompanyComponent implements OnInit,OnDestroy {

  public UsersList: CompanyUsers[] = [];
  Id = JSON.parse(localStorage.getItem('userData') || '{id: 1}').id;
  searchQuery = '';
  filteredUsersList = this.UsersList;
  sub:Subscription=new Subscription();
  filterUsers() {
    this.filteredUsersList = this.UsersList.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phone.includes(this.searchQuery)
    );
  }

  constructor(public companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.GetCompanyUsers(this.Id).subscribe(
      {
        next: (data) => {
          this.UsersList = data;
        }
      }
    );
  }

  DownloadUserData(Id: string) {
   this.sub= this.companyService.GetUserArchive(Id).subscribe({
      next: (data) => console.log("success dowenload"),
      error: (err) => console.log("error occured")

    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}

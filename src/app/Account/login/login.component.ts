import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {LoginService} from '../../services/account/login.service'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule,RouterLink,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Loginform :FormGroup=new FormGroup({
    Email :new FormControl(),
    Password : new FormControl()
  })
  constructor(private loginService: LoginService) {}
  login() {
    const email = this.Loginform.get('Email')?.value;
    const password = this.Loginform.get('Password')?.value;

  //  debugger;
      this.loginService.login(email, password).subscribe(
        {next:(data)=>{
          console.log('Login successful:', data);
        },
        error:(error) => {
          console.error('Login error:', error);
        }
      }
      //  next :(response) => {
      //     console.log('Login successful:', response);
      //   },
      // (error) => {
      //   // Handle error
      //   console.error('Login error:', error);
      // }
      );
    
  }

}


declare var google:any;
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {LoginService} from '../../services/account/login.service'
import { RouterLink } from '@angular/router';
import { Googlelogin } from '../../models/Account/googlelogin';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:'720571637733-0dkqjkrolhqs2iq1vbbb4bigmacf4sje.apps.googleusercontent.com',
      callback:(res:any)=>this.handlelogin(res)
      

      
    })

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
    theme:'filled_blue',
    size:'large',
    shape:'rectangle',
    width:50


    })

  }
  private decodeToken(token :string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handlelogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      const googleObj = new Googlelogin(payload.email); // Adjust based on your Googlelogin model
  
      this.loginService.googlelog(googleObj).subscribe({
        next: (data) => {
          console.log('Login successful:', data);
          // Handle successful login, e.g., navigate to a different page
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error, e.g., display error message
        }
      });
    }
  }
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

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RegisterData } from '../services/iregistration.service'; // Adjust the path as necessary
import { RegistrationService } from '../services/registration.service'; // Adjust the path as necessary

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    './fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    './fonts/iconic/css/material-design-iconic-font.css',
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [RegistrationService],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: string | null = null;
  showPassword: boolean = false; // Property to toggle password visibility

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required], [this.usernameValidator()]],
      emailAddress: [
        '',
        [Validators.required, Validators.email],
        [this.emailValidator()],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      taxNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      location: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(011|012|010)\d{8}$/)],
      ],
    });
  }

  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
      return { passwordStrength: true };
    }
    return null;
  }

  usernameValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((username) =>
          this.registrationService.checkUsernameAvailability(username)
        ),
        map((isAvailable) => (isAvailable ? null : { usernameTaken: true })),
        catchError(() => of(null))
      );
    };
  }

  emailValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((email) =>
          this.registrationService.checkEmailAvailability(email)
        ),
        map((isAvailable) => (isAvailable ? null : { emailTaken: true })),
        catchError(() => of(null))
      );
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: RegisterData = this.registerForm.value;
      this.registrationService.registerUser(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          this.registrationError = 'Registration failed. Please try again.';
          console.error('Registration failed', error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
    }
  }

  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

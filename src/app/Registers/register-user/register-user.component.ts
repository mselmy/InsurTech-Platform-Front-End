import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { registerUser } from '../../services/iregistration-user.service';
import { RegistrationUserService } from '../../services/registration-user.service';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'; // Import the CookieService
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    InputMaskModule,
  ],
  providers: [RegistrationUserService, MessageService, CookieService],
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  processInProgress: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationUserService,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required], [this.usernameAsyncValidator()]],
      emailAddress: [
        '',
        [Validators.required, Validators.email],
        [this.emailAsyncValidator()],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      nationalId: [
        '',
        [Validators.required, Validators.pattern(/^\d{14}$/)],
        [this.nationalIdValidator()],
      ],
      birthDate: ['', [Validators.required, this.birthDateValidator()]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(011|012|010|015)\d{8}$/)],
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

  birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const minDate = new Date(1900, 0, 1); // January 1, 1900
      const maxDate = new Date();
      if (birthDate < minDate || birthDate > maxDate) {
        return {
          invalidBirthDate:
            'Please enter birth date between 1900 and the current year.',
        };
      }
      return null;
    };
  }

  usernameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
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

  emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
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

  nationalIdValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((nationalId) =>
          this.registrationService.checkNationalIdAvailability(nationalId)
        ),
        map((isAvailable) => (isAvailable ? null : { nationalIdTaken: true })),
        catchError(() => of(null))
      );
    };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.processInProgress = 'registering';
    const user: registerUser = {
      name: this.registerForm.value.name,
      userName: this.registerForm.value.userName,
      emailAddress: this.registerForm.value.emailAddress,
      password: this.registerForm.value.password,
      nationalId: this.registerForm.value.nationalId,
      birthDate: this.formatDate(this.registerForm.value.birthDate),
      phoneNumber: this.registerForm.value.phoneNumber,
    };

    this.registrationService.registerCustomer(user).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful',
        });
        this.cookieService.set('user', JSON.stringify(user)); // Set the cookie
        this.processInProgress = 'success';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registration failed',
        });
        this.processInProgress = 'error';
        console.error('Registration failed', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      const d = new Date(date);
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return date;
  }
}

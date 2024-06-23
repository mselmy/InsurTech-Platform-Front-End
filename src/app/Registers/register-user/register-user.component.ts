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
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { RegistrationUserService } from '../../services/registration-user.service';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { registerUser } from '../../services/iregistration-user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    InputMaskModule,
    CalendarModule,
  ],
  providers: [RegistrationUserService, MessageService, CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterUserComponent {
  registerForm: FormGroup;

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
      nationalId: [
        '',
        [Validators.required, Validators.pattern(/^\d{14}$/)],
        [this.nationalIdAsyncValidator()],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      birthDate: ['', [Validators.required, this.birthDateValidator()]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(011|012|010|015)\d{8}$/)],
      ],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
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

  emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((email) =>
          this.registrationService.checkEmailAvailability(email).pipe(
            map(() => null),
            catchError(() => of({ emailTaken: true }))
          )
        )
      );
    };
  }

  usernameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((username) =>
          this.registrationService.checkUsernameAvailability(username).pipe(
            map(() => null),
            catchError(() => of({ usernameTaken: true }))
          )
        )
      );
    };
  }

  nationalIdAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((nationalId) =>
          this.registrationService.checkNationalIdAvailability(nationalId).pipe(
            map(() => null),
            catchError(() => of({ nationalIdTaken: true }))
          )
        )
      );
    };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formData: registerUser = {
      ...this.registerForm.value,
      birthDate: this.formatDate(this.registerForm.value.birthDate),
    };

    this.registrationService.registerCustomer(formData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful',
        });
        this.cookieService.set('user', JSON.stringify(response));
        this.router.navigate(['/']); // Navigate to home page
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registration failed',
        });
        console.error('Registration failed', error);
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

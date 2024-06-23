import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RegisterData } from '../../services/iregistration.service'; // Adjust the path as necessary
import { RegistrationService } from '../../services/registration.service'; // Adjust the path as necessary
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [RegistrationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent {
  registerForm: FormGroup;
  processInProgress: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private messageService: MessageService
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
      taxNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      location: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(011|012|010)\d{8}$/)],
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

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('emailAddress')?.value;
      this.processInProgress = `Processing your request. Please check your email (${email}) for further instructions.`;

      const registerData: RegisterData = this.registerForm.value;
      this.registrationService.registerUser(registerData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'Please check your email to verify your account.',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An error occurred during registration. Please try again.',
          });
        },
      });
    }
  }
}

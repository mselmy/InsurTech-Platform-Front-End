import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { registerUser } from '../services/iregistration-user.service'; // Adjust the path as necessary
import { RegistrationUserService } from '../services/registration-user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: [
    './register-user.component.css',
    '../register/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../register/fonts/iconic/css/material-design-iconic-font.css',
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  providers: [RegistrationUserService],
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  processInProgress: string | null = null;
  showPassword: boolean = false; // Property to toggle password visibility

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationUserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      birthDate: ['', Validators.required],
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

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('emailAddress')?.value;
      this.processInProgress = `Processing your request. Please check your email (${email}) for further instructions.`;

      const registerData: registerUser = this.registerForm.value;
      this.registrationService.registerCustomer(registerData).subscribe({
        next: () => {
          // Do nothing to keep the notification visible
        },
        error: () => {
          // Do nothing to keep the notification visible
          console.error('Registration failed');
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

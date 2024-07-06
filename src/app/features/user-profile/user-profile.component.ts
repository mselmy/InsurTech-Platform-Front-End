import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../core/services/user-profile.service';
import { UserProfile } from '../../core/models/userprofile';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      nationalId: [{ value: '', disabled: true }, Validators.required],
      birthDate: ['', [Validators.required, this.birthDateValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(011|012|010|015)\d{8}$/)]]
    });
  }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(user => {
      this.userForm.patchValue({
        id: user.id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        nationalId: user.nationalId,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber
      });
      console.log('User profile loaded successfully', user);
    });
  }

  updateUserProfile() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();
      const user = new UserProfile(
        formValue.id,
        formValue.name,
        formValue.userName,
        formValue.email,
        formValue.nationalId,
        formValue.birthDate,
        formValue.phoneNumber
      );

      this.userProfileService.updateUser(user).subscribe(
        updatedUser => {
          console.log('User updated successfully', updatedUser);
          Swal.fire('Success', 'User profile updated successfully', 'success');
        },
        error => {
          console.error('Error updating user', error);
          Swal.fire('Error', 'Error updating user profile', 'error');
        }
      );
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    const controls = this.userForm.controls;
    let errorMessage = '';

    if (controls['name'].errors) {
      errorMessage += 'Name is required. ';
    }
    if (controls['userName'].errors) {
      errorMessage += 'Username is required. ';
    }
    if (controls['email'].errors) {
      errorMessage += 'Valid email is required. ';
    }
    if (controls['nationalId'].errors) {
      errorMessage += 'National ID is required. ';
    }
    if (controls['birthDate'].errors) {
      errorMessage += 'Birth date is required. ';
    }
    if (controls['phoneNumber'].errors) {
      errorMessage += 'Phone number is required. ';
    }

    Swal.fire('Validation Error', errorMessage, 'warning');
  }

  birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const minDate = new Date(1900, 0, 1); // January 1, 1900
      const maxDate = new Date();
      if (birthDate < minDate || birthDate > maxDate) {
        return {
          invalidBirthDate: 'Please enter birth date between 1900 and the current year.',
        };
      }
      return null;
    };
  }
}

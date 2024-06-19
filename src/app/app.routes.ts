import { Routes } from '@angular/router';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { QuestionsFormComponent } from './features/apply-for-insurance/components/questions-form/questions-form.component';
import { AppLayoutComponent } from './features/admin-dashboard/layout/app.layout.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ApplyForInsuranceComponent } from './features/apply-for-insurance/apply-for-insurance.component';


export const routes: Routes = [
  {
    path: 'admin',
    component: AppLayoutComponent,
    children: [
      {
        path: 'registration-requests',
        component: RegistrationRequestsComponent,
      },
    ],
  },
  { path: 'apply-for-insurance', component: ApplyForInsuranceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

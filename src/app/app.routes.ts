import { Routes } from '@angular/router';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { QuestionsFormComponent } from './features/apply-for-insurance/components/questions-form/questions-form.component';
import { AppLayoutComponent } from './features/admin-dashboard/layout/app.layout.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ApplyForInsuranceComponent } from './features/apply-for-insurance/apply-for-insurance.component';
import { DisplayComponent } from './Categories/display/display.component'; 
import { SubCategoryHealthComponent  } from './Categories/sub-Healthcategory/sub-category.component';
import { SubCategoryHomeComponent } from './Categories/sub-Homecategory/sub-category.component';
import { SubCategoryMotorComponent } from './Categories/sub-Motorcategory/sub-category.component';
import { CompanyInsurancePlanComponent } from './Company/company-insurance-plan/company-insurance-plan.component';
import { AppComponent } from './app.component';


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
  {
    path: 'Insurance',
    component: AppComponent,
    children: [
      { path: 'Health', component: SubCategoryHealthComponent },
      { path: 'Home', component: SubCategoryHomeComponent },
      { path: 'Motor', component: SubCategoryMotorComponent },
      { path: '', component: DisplayComponent },
    ]
  },
  {
    path: 'CompanyInsurance',
    component: AppComponent,
    children: [
      { path: '', component: CompanyInsurancePlanComponent },
     
    ]
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

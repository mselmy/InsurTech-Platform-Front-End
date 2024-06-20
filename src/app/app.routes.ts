import { Routes } from '@angular/router';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { QuestionsFormComponent } from './features/apply-for-insurance/components/questions-form/questions-form.component';
import { AppLayoutComponent } from './features/admin-dashboard/layout/app.layout.component';
import { RegisterComponent } from './register/register.component';
import { ApplyForInsuranceComponent } from './features/apply-for-insurance/apply-for-insurance.component';
import { DisplayComponent } from './Categories/display/display.component';
import { SubCategoryHomeComponent } from './Categories/sub-Homecategory/sub-category.component';
import { SubCategoryMotorComponent } from './Categories/sub-Motorcategory/sub-category.component';
import { SubCategoryHealthComponent } from './Categories/sub-Healthcategory/sub-category.component';
import { AppComponent } from './app.component';
import { CompanyInsurancePlanComponent } from './Company/company-insurance-plan/company-insurance-plan.component';
import { FAQComponent } from './faq/faq.component';

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
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'Insurance',
    component: AppComponent,
    children: [
      { path: '', component: DisplayComponent },
      { path: 'Health', component: SubCategoryHealthComponent },
      { path: 'Home', component: SubCategoryHomeComponent },
      { path: 'Motor', component: SubCategoryMotorComponent }
    ]
  },
  {
    path: 'CompanyInsurance',
    component: AppComponent,
    children: [
      { path: '', component: CompanyInsurancePlanComponent },
     
    ]
  },
  {
    path: 'FAQs',
    component: AppComponent,
    children: [
      { path: '', component: FAQComponent },
     
    ]
  },
];

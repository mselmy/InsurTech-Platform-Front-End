import { Routes } from '@angular/router';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { QuestionsFormComponent } from './shared/components/questions-form/questions-form.component';
import { AppLayoutComponent } from './features/admin-dashboard/layout/app.layout.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './features/User/Components/companies/companies.component';
import { GetCategoriesComponent } from './features/User/Components/get-categories/get-categories.component';
import { StepsComponent } from './features/User/Components/steps/steps.component';
import { HeaderComponent } from './home/header/header.component';
import { HeaderHomePageComponent } from './features/User/Components/header-home-page/header-home-page.component';

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
  { path: 'form', component: QuestionsFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'HomePage',
    component: AppComponent,
    children: [
      
      { path: 'companies', component: CompaniesComponent },
      { path: 'categories', component: GetCategoriesComponent },
      { path: 'steps', component: StepsComponent },
      { path: 'header', component: HeaderHomePageComponent },
    ]
      
  }
];

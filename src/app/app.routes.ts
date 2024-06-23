import { Routes } from '@angular/router';
import { companydashbordcomponant } from './features/company-dashboard/company-dashboard';
import { EditHealthInsurancePlanComponent } from './features/company-dashboard/Componants/Helathinsurance/edithealthinsurance/edithealthinsurance.component';
import { EdithomeinsuranceComponent } from './features/company-dashboard/Componants/Homeinsurance/edithomeinsurance/edithomeinsurance.component';
import { EditmotorinsuranceComponent } from './features/company-dashboard/Componants/Motorinsurance/editmotorinsurance/editmotorinsurance.component';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Registers/register/register.component';
import { RegisterUserComponent } from './Registers/register-user/register-user.component';
import { ApplyForInsuranceComponent } from './features/apply-for-insurance/apply-for-insurance.component';
import { DisplayComponent } from './Categories/display/display.component';
import { SubCategoryHealthComponent } from './Categories/sub-Healthcategory/sub-category.component';
import { SubCategoryHomeComponent } from './Categories/sub-Homecategory/sub-category.component';
import { SubCategoryMotorComponent } from './Categories/sub-Motorcategory/sub-category.component';
import { CompanyInsurancePlanComponent } from './Company/company-insurance-plan/company-insurance-plan.component';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LoginComponent } from '../app/Account/login/login.component';
import { ForgetPasswordComponent } from '../app/Account/forget-password/forget-password.component';
import { ResetpasswordComponent } from '../app/Account/resetpassword/resetpassword.component';
=======
import {LoginComponent} from '../app/Account/login/login.component'
import {ForgetPasswordComponent} from '../app/Account/forget-password/forget-password.component'
import{ResetpasswordComponent} from '../app/Account/resetpassword/resetpassword.component'
import { ApplyForInsuranceV2Component } from './features/apply-for-insurance-v2/apply-for-insurance-v2.component';
import { QuestionCardComponent } from './features/apply-for-insurance-v2/question-card/question-card.component';
import { QuestionsListComponent } from './features/apply-for-insurance-v2/questions-list/questions-list.component';

>>>>>>> 73350e6c92dfc6969fcbd9b1c4f55d33f1c0240e

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin-dashboard/layout/app.layout.module').then(
        (m) => m.AppLayoutModule
      ),
  },
  { path: 'apply-for-insurance', component: ApplyForInsuranceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  {
    path: 'Insurance',
    component: AppComponent,
    children: [
      { path: 'Health', component: SubCategoryHealthComponent },
      { path: 'Home', component: SubCategoryHomeComponent },
      { path: 'Motor', component: SubCategoryMotorComponent },
      { path: '', component: DisplayComponent },
    ],
  },
  {
    path: 'CompanyInsurance',
    component: AppComponent,
    children: [{ path: '', component: CompanyInsurancePlanComponent }],
  },
<<<<<<< HEAD
  { path: 'dashboard', component: companydashbordcomponant },
  {
    path: 'edithealthinsurance/:id',
    component: EditHealthInsurancePlanComponent,
  },
  { path: 'edithomeinsurance/:id', component: EdithomeinsuranceComponent },
  { path: 'editmotorinsurance/:id', component: EditmotorinsuranceComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
=======
  {
    path:'dashboard',component:companydashbordcomponant,
  },

  { path: 'edithealthinsurance/:id', component:EditHealthInsurancePlanComponent},
  { path: 'edithomeinsurance/:id', component:EdithomeinsuranceComponent},
  { path: 'editmotorinsurance/:id', component:EditmotorinsuranceComponent },
  {path:"HomePage",component:HomeComponent},
  {
    path:"apply-for-insuranceV2",
    component:ApplyForInsuranceV2Component,
    // children:[
    //   {
    //     path:"Question/:id",
    //     component:QuestionCardComponent
    //   }
    // ]
  },
  {
    path:"questions-list/:id",
    component:QuestionsListComponent
  }
>>>>>>> 73350e6c92dfc6969fcbd9b1c4f55d33f1c0240e
];

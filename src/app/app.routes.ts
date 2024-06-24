import { Routes } from '@angular/router';
import { companydashbordcomponant } from './features/company-dashboard/company-dashboard';
import { EditHealthInsurancePlanComponent } from './features/company-dashboard/Componants/Helathinsurance/edithealthinsurance/edithealthinsurance.component';
import { EdithomeinsuranceComponent } from './features/company-dashboard/Componants/Homeinsurance/edithomeinsurance/edithomeinsurance.component';
import { EditmotorinsuranceComponent } from './features/company-dashboard/Componants/Motorinsurance/editmotorinsurance/editmotorinsurance.component';
import { RegisterComponent } from './features/register/register.component';
import { RegisterUserComponent } from './features/register-user/register-user.component';
import { ApplyForInsuranceComponent } from './features/apply-for-insurance/apply-for-insurance.component';
import { DisplayComponent } from './features/categories/display/display.component';
import { SubCategoryHealthComponent } from './features/categories/sub-Healthcategory/sub-category.component';
import { SubCategoryMotorComponent } from './features/categories/sub-Motorcategory/sub-category.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/Account/login/login.component';
import { ForgetPasswordComponent } from './features/Account/forget-password/forget-password.component';
import { ResetpasswordComponent } from './features/Account/resetpassword/resetpassword.component';
import { ApplyForInsuranceV2Component } from './features/apply-for-insurance-v2/apply-for-insurance-v2.component';
import { QuestionsListComponent } from './features/apply-for-insurance-v2/questions-list/questions-list.component';
import { authAdminGuard } from './core/guards/authAdmin.guard';
import { HomeComponent } from './features/home/home.component';
import { CompanyInsurancePlanComponent } from './features/company/company-insurance-plan/company-insurance-plan.component';
import { SubCategoryHomeComponent } from './features/categories/sub-Homecategory/sub-category.component';
<<<<<<< Hussien
=======
import{AllarticlesComponent} from '../app/features/allarticles/allarticles.component'
import{HomearticlesComponent}from '../app/features/homearticles/homearticles.component'
>>>>>>> dev
import { FAQComponent } from './features/faq/faq.component';


export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin-dashboard/layout/app.layout.module').then(
        (m) => m.AppLayoutModule
      ),
    canActivate: [authAdminGuard],
  },
  { path: 'apply-for-insurance', component: ApplyForInsuranceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:authorization', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  {path:'allarticles',component:AllarticlesComponent},
  {path:'homearticle',component:HomearticlesComponent},
  {
    path: 'insurance',
    component: AppComponent,
    children: [
      { path: '', component: DisplayComponent },
      { path: 'health', component: SubCategoryHealthComponent },
      { path: 'home', component: SubCategoryHomeComponent },
      { path: 'motor', component: SubCategoryMotorComponent },
    ],
  },
  {
    path: 'companyinsurance',
    component: AppComponent,
    children: [{ path: '', component: CompanyInsurancePlanComponent }],
  },
  {
    path: 'faqs',
    component: AppComponent,
    children: [{ path: '', component: FAQComponent }],
  },
  {
    path: 'dashboard',
    component: companydashbordcomponant,
  },

  {
    path: 'edithealthinsurance/:id',
    component: EditHealthInsurancePlanComponent,
  },
  { path: 'edithomeinsurance/:id', component: EdithomeinsuranceComponent },
  { path: 'editmotorinsurance/:id', component: EditmotorinsuranceComponent },
  { path: 'HomePage', component: HomeComponent },
  {
    path: 'apply-for-insuranceV2',
    component: ApplyForInsuranceV2Component,
    // children:[
    //   {
    //     path:"Question/:id",
    //     component:QuestionCardComponent
    //   }
    // ]
  },
  {
    path: 'questions-list/:id',
    component: QuestionsListComponent,
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

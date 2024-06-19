import { Routes } from '@angular/router';
import { ListInsurancePlanComponent } from './features/company-dashboard/Componants/list-insurance-plan/list-insurance-plan.component';
import { CardsComponent } from './features/company-dashboard/Componants/cards/cards.component';
import { companydashbordcomponant } from './features/company-dashboard/company-dashboard';
import { SidenavComponent } from './features/company-dashboard/Componants/sidenav/sidenav.component';
import { ChartCompanyComponent } from './features/company-dashboard/Componants/chart-company/chart-company.component';
import { UsersCompanyComponent } from './features/company-dashboard/Componants/users-company/users-company.component';
import { EditHealthInsurancePlanComponent } from './features/company-dashboard/Componants/Helathinsurance/edithealthinsurance/edithealthinsurance.component';
import { EdithomeinsuranceComponent } from './features/company-dashboard/Componants/Homeinsurance/edithomeinsurance/edithomeinsurance.component';
import { EditmotorinsuranceComponent } from './features/company-dashboard/Componants/Motorinsurance/editmotorinsurance/editmotorinsurance.component';

export const routes: Routes = [
    {path:'',component:companydashbordcomponant},
    { path: 'edithealthinsurance/:id', component:EditHealthInsurancePlanComponent},
    { path: 'edithomeinsurance/:id', component:EdithomeinsuranceComponent},
    { path: 'editmotorinsurance/:id', component:EditmotorinsuranceComponent },
  

];

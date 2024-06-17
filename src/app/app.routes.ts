import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';
import { HomeComponent } from './home/home.component';
import { QuestionsFormComponent } from './shared/components/questions-form/questions-form.component';
import { AppLayoutComponent } from './layout/app.layout.component';

export const routes: Routes = [
    {path: 'admin', component: AdminDashboardComponent, children: [
        {path: 'registration-requests', component: RegistrationRequestsComponent}
    ]
    },
    {path: 'test', component: AppLayoutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'form', component: QuestionsFormComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

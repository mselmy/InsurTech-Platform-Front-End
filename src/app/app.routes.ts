import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { RegistrationRequestsComponent } from './features/admin-dashboard/components/registration-requests/registration-requests.component';

export const routes: Routes = [
    {path: 'admin', component: AdminDashboardComponent, children: [
        {path: 'registration-requests', component: RegistrationRequestsComponent}
    ]
    },
    {path: '', redirectTo: '/admin', pathMatch: 'full'}
];

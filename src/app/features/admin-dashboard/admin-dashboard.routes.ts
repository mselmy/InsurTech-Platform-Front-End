import { Routes } from '@angular/router';
import { RegistrationRequestsComponent } from './components/registration-requests/registration-requests.component';
import { ArticleComponent } from './components/article/article.component';
import { AppLayoutComponent } from './layout/app.layout.component';

export const adminDashboardRoutes: Routes = [
    { path: '', component: AppLayoutComponent,
        children: [
            { path: 'registration-requests', component: RegistrationRequestsComponent },
            { path: 'article', component: ArticleComponent }
        ]
    },
];
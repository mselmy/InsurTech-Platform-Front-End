import { RouterModule,Routes } from '@angular/router';
import {LoginComponent} from '../app/Account/login/login.component'
import {ForgetPasswordComponent} from '../app/Account/forget-password/forget-password.component'
import{ResetpasswordComponent} from '../app/Account/resetpassword/resetpassword.component'
export const routes: Routes = [

    { path:"login",component:LoginComponent},
    { path:"forgetpassword",component:ForgetPasswordComponent},
    { path: 'resetpassword', component: ResetpasswordComponent }]

;

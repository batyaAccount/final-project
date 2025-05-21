import { Routes } from '@angular/router';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: "home", component: HomePageComponent},
    { path: "UserManagement", component: UserManagementComponent},
];

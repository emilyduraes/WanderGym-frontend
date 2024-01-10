import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './@core/_helpers/auth-guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { 
    path: '',
    component:LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) 
  }, 
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logout',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'reset-password',
    component:ResetpasswordComponent
  },
  {
    path: 'user-dashboard',
    component:UserDashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'business-dashboard',
    component:BusinessDashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component:AdminDashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

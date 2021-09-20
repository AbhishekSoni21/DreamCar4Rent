import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginauthGuard } from './guard/loginauth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { UserSectionComponent } from './page/user-section/user-section.component';
import { ViewEditProfileComponent } from './page/view-edit-profile/view-edit-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:AuthComponent,canActivate:[LoginauthGuard]},
  {path:'user',component:UserSectionComponent,canActivate:[AuthGuard],children:[{
    path:'',component:ViewEditProfileComponent
  }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

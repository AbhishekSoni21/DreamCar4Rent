import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { LoginauthGuard } from './guard/loginauth.guard';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { UserBookingRecordComponent } from './page/user-booking-record/user-booking-record.component';
import { UserSectionComponent } from './page/user-section/user-section.component';
import { ViewEditProfileComponent } from './page/view-edit-profile/view-edit-profile.component';
import { FetchAllBookingDetailsResolver } from './resolver/fetch-all-booking-details.resolver';
import { FetchAllCarListResolver } from './resolver/fetch-all-car-list.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:{carlist:FetchAllCarListResolver}
  },
  { path: 'login', component: AuthComponent, canActivate: [LoginauthGuard] },
  {
    path: 'user',
    component: UserSectionComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ViewEditProfileComponent,
        pathMatch:'full'
      },
      {
        path: 'myBooking',
        component: UserBookingRecordComponent,
        resolve: { bookingDetails: FetchAllBookingDetailsResolver },
      },
    ],

  },{
    path:'admin',
    component:AdminPageComponent,
    canActivate:[AdminGuard]
  }
  ,{
    path:'**',
    component:PageNotFoundComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

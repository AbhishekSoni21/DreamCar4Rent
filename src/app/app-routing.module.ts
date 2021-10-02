import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginauthGuard } from './guard/loginauth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';
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

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AppHttpInterceptor } from './http.interceptor';
import { ViewEditProfileComponent } from './page/view-edit-profile/view-edit-profile.component';
import { UserSectionComponent } from './page/user-section/user-section.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PopupModalComponent,
    LoaderComponent,
    NavbarComponent,
    DashboardComponent,
    ViewEditProfileComponent,
    UserSectionComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AppHttpInterceptor,
    multi:true
  },{ provide: BUCKET, useValue: environment.firebaseConfig.storageBucket }],
  bootstrap: [AppComponent]
})
export class AppModule { }

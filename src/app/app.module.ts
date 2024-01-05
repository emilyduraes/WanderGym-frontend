import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Counter
import { CountUpModule } from 'ngx-countup';

// Route
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';

// Service
import { UserService } from './@core/services/user.service';
import { BusinessService } from './@core/services/business.service';
import { AuthInterceptorService } from './@core/services/auth-interceptor.service';
import { LoginService } from './@core/services/login.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    UserDashboardComponent,
    BusinessDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CountUpModule,
    FormsModule
  ],
  providers: [
    UserService,
    BusinessService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

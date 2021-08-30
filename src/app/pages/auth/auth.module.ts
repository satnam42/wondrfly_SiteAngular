import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { SocialModule } from 'src/app/core/components/social-login/social-login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SignUpGuardianComponent } from './sign-up-guardian/sign-up-guardian.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    LoginComponent,
    SignUpGuardianComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    FormsModule,
    SocialModule
  ],
 
    // { provide: LocationStrategy, useClass: PathLocationStrategy }

  
})
export class AuthModule { }

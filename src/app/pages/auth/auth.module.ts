import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { LocalStorageService } from 'src/app/core/services';
import { AuthsService } from 'src/app/core/services/auths.service';
import { UserGuard } from 'src/app/core/guards';
import { ChatService } from 'src/app/core/services/chat.service';
import { Globals } from 'src/app/core/common/imageLoader';
import { MapTheme } from 'src/app/core/common/map-theme';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { provideConfig } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SignUpGuardianComponent } from './sign-up-guardian/sign-up-guardian.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    LoginComponent,
    SignUpGuardianComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
 
    // { provide: LocationStrategy, useClass: PathLocationStrategy }

  
})
export class AuthModule { }

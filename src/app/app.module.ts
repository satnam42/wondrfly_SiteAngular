import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from '../app/app.component';
import { LocalStorageService } from '../app/core/services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LandingComponent } from './pages/landing/landing.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AgmCoreModule } from '@agm/core';
import { Globals } from './core/common/imageLoader';
import { MapTheme } from './core/common/map-theme';
import { ToastrModule } from 'ngx-toastr';
import { MailchimpSubscribeFormModule } from './core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { ChatService } from './core/services/chat.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdwonPipe } from './core/shared/markdown/markdwon.pipe';
import { MarkdownModule } from './core/shared/markdown/markdown.module';
import { AskToJoinComponent } from './pages/auth/ask-to-join/ask-to-join.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpGuardianComponent } from './pages/auth/sign-up-guardian/sign-up-guardian.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';


const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

// guards
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    LazyLoadImageModule,
    MailchimpSubscribeFormModule,
    MarkdownModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    ToastrModule.forRoot(),

  ],
  providers: [
    LocalStorageService,
    ChatService,
    Globals,
    MapTheme,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

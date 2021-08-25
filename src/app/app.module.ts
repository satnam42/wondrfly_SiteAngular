import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from '../app/app.component';
import { LocalStorageService } from '../app/core/services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthsService } from './core/services/auths.service';
import { UserGuard } from './core/guards';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AgmCoreModule } from '@agm/core';
import { SocialLoginModule, FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { Globals } from './core/common/imageLoader';
import { MapTheme } from './core/common/map-theme';
import { ToastrModule } from 'ngx-toastr';
import { MailchimpSubscribeFormModule } from './core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { ChatService } from './core/services/chat.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';


const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

// guards
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    // NotFoundComponent
  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule,
    LazyLoadImageModule,
    MailchimpSubscribeFormModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    LocalStorageService,
    AuthsService,
    UserGuard,
    ChatService,
    Globals,
    MapTheme,
    // { provide: LocationStrategy, useClass: PathLocationStrategy  
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('335753464827-9pllubf5hlm97nf893j5rfhvmvcv28hi.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '2938106953127281'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

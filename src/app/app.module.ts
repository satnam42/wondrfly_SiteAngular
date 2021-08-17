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
import { ChatService } from './core/services/chat.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AgmCoreModule } from '@agm/core';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Globals } from './core/common/imageLoader';
import { MapTheme } from './core/common/map-theme';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { ServiceWorkerModule } from '@angular/service-worker';






const configs = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2938106953127281')
    // provider: new FacebookLoginProvider('273271161090720')
    // provider: new FacebookLoginProvider('531594798084842')

  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('335753464827-9pllubf5hlm97nf893j5rfhvmvcv28hi.apps.googleusercontent.com')
  }

]);

export function provideConfig() {
  return configs;
}

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
const components = [
  AppComponent,
];
// guards
@NgModule({
  declarations: [
    ...components,
    LandingComponent,
  ],

  entryComponents: [
    ...components,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    // ChatModule,
    NgxDaterangepickerMd.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    LocalStorageService,
    AuthsService,
    UserGuard,
    ChatService,
    Globals,
    MapTheme,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    // { provide: LocationStrategy, useClass: PathLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

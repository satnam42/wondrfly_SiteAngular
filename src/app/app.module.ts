import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from '../app/app.component';
import { LocalStorageService } from '../app/core/services';
import { ProgramComponent } from './pages/provider/program/program.component';
import { HttpClientModule } from '@angular/common/http';
import { ParentComponent } from './pages/parent/parent.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { environment } from '../environments/environment';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthsService } from './core/services/auths.service';
import { UserGuard } from './core/guards';
import { ChatModule } from './pages/chat/chat.module';
import { ChatService } from './core/services/chat.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SignUpGuardianComponent } from './pages/sign-up-guardian/sign-up-guardian.component';
import { GuardianComponent } from './pages/guardian/guardian.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AgmCoreModule } from '@agm/core';
import { SearchComponent } from './pages/search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileComponent, PhonePipe } from './pages/provider/profile/profile.component';
import { LoginProviderComponent } from './pages/provider/login-provider/login-provider.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Globals } from './core/common/imageLoader';
import { MapTheme } from './core/common/map-theme';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ProgramModule } from './pages/provider/program/program.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ToastrModule } from 'ngx-toastr';






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
    SignUpComponent,
    LoginComponent,
    ProgramComponent,
    ParentComponent,
    SignUpGuardianComponent,
    GuardianComponent,
    SearchComponent,
    ProfileComponent,
    LoginProviderComponent,
    PhonePipe,
  ],

  entryComponents: [
    ...components,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxUiLoaderModule,
    CoreModule,
    NgxSliderModule,
    AutocompleteLibModule,
    ChatModule,
    NgxDaterangepickerMd.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SocketIoModule.forRoot(config),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxUiLoaderModule,
    AutocompleteLibModule,
    InfiniteScrollModule,
    ProgramModule,
    Ng2SearchPipeModule,
    MatProgressBarModule,
    NgxMaskModule.forRoot(),
    // GoogleMapsModule,
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
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    // { provide: LocationStrategy, useClass: PathLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

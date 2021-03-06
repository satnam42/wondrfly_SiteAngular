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
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AgmCoreModule } from '@agm/core';
import { Globals } from './core/common/imageLoader';
import { ToastrModule } from 'ngx-toastr';
import { MailchimpSubscribeFormModule } from './core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { ChatService } from './core/services/chat.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdownModule } from './core/shared/markdown/markdown.module';
import { JoyrideModule } from 'ngx-joyride';
import { CookieService } from 'ngx-cookie-service';
import { ActiveUser } from './core/guards';
import { MapTheme } from './core/common/map-theme';
import { createCookies } from './core/common/create-cookies';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

// guards
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
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
    JoyrideModule.forRoot(),

  ],
  providers: [
    ActiveUser,
    LocalStorageService,
    ChatService,
    Globals,
    createCookies,
    CookieService,
    MapTheme
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

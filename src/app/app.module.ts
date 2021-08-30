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
    ChatService,
    Globals,
    MapTheme,
    // { provide: LocationStrategy, useClass: PathLocationStrategy  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

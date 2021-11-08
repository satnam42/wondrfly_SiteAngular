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
import { ToastrModule } from 'ngx-toastr';
import { MailchimpSubscribeFormModule } from './core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { ChatService } from './core/services/chat.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdownModule } from './core/shared/markdown/markdown.module';
import { JoyrideModule } from 'ngx-joyride';


const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

// guards
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent  ],
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
    JoyrideModule.forRoot(),

  ],
  providers: [
    LocalStorageService,
    ChatService,
    Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

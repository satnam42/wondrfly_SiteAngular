import { MailchimpSubscribeFormModule } from './../../core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { sharePopupModule } from './../../core/components/share-popup/share-popup.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AgmCoreModule } from '@agm/core';
import { OnlineProgramsComponent } from 'src/app/core/components/online-programs/online-programs.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { SignupPopupModule } from 'src/app/core/components/signup-popup/signup-popup.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { JoyrideModule } from 'ngx-joyride';
@NgModule({
  declarations: [SearchComponent, OnlineProgramsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    RatingModule,
    FormsModule,
    InfiniteScrollModule,
    SignupPopupModule,
    LazyLoadImageModule,
    NgxDaterangepickerMd.forRoot(),
    AgmCoreModule,
    NgxSliderModule,
    sharePopupModule,
    MailchimpSubscribeFormModule,
    JoyrideModule,
  ]
})
export class SearchModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';
import { AgmCoreModule } from '@agm/core';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SignupPopupModule } from 'src/app/core/components/signup-popup/signup-popup.module';
@NgModule({
  declarations: [ProviderComponent, ProgramProviderComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    CoreModule,
    RatingModule,
    AgmCoreModule,
    LazyLoadImageModule,


    FormsModule,
    SignupPopupModule,
    NgxDaterangepickerMd.forRoot(),
    NgxSliderModule,
  ]
})
export class ProviderModule { }

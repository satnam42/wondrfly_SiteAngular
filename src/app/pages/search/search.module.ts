import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AgmCoreModule } from '@agm/core';
import { OnlineProgramsComponent } from 'src/app/core/components/online-programs/online-programs.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { SignupPopupModule } from 'src/app/core/components/signup-popup/signup-popup.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatSnackBarModule} from '@angular/material/snack-bar';
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
    ReactiveFormsModule,
    NgxDaterangepickerMd,
    AgmCoreModule,
    NgxSliderModule,
    MatSnackBarModule

  ]
})
export class SearchModule { }

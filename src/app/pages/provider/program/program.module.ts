import { sharePopupModule } from './../../../core/components/share-popup/share-popup.module';
import { NgModule } from '@angular/core';
import { ProgramRoutingModule } from './program.routing';
import { DetailComponent } from './detail/detail.component'
import { CoreModule } from '../../../core/core.module';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ProgramComponent } from './program.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatInputModule } from '@angular/material/input';
import { ReadMoreModule } from 'src/app/core/components/read-more/read-more.module';

@NgModule({
  entryComponents: [],
  declarations: [
    ProgramComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    CoreModule,
    RatingModule,
    ReadMoreModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    NgxSliderModule,
    MatInputModule,
    AgmCoreModule,
    sharePopupModule,
  ],
  exports: [
    ProgramComponent,
    DetailComponent,
  ]
})
export class ProgramModule { }

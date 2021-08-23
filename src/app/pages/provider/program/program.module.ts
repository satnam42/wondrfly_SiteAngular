import { NgModule } from '@angular/core';
import { ProgramRoutingModule } from './program.routing';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component'
import { AddComponent } from './add/add.component'
import { DetailComponent } from './detail/detail.component'
import { CoreModule } from '../../../core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../program/setting/modal/modal.component';
import { SettingComponent } from './setting/setting.component'
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { ProgramComponent } from './program.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { DragDropModule } from 'src/app/core/components/drag-drop/drag-drop.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  entryComponents: [ ModalComponent],
  declarations: [
    ProgramComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    // ModalComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RatingModule,
    DragDropModule,
    ChartsModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    NgxSliderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule,
    AutocompleteLibModule,
  ],
  exports: [
    ProgramComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    SettingComponent,
    // ProgramComponent
  ],
  providers: [
    ThemeService
    // ...services
  ],
})
export class ProgramModule { }

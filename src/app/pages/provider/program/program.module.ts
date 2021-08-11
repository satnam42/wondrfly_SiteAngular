import { NgModule } from '@angular/core';
import { ProgramRoutingModule } from './program.routing';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component'
import { AddComponent } from './add/add.component'
import { DetailComponent } from './detail/detail.component'
import { CoreModule } from '../../../core/core.module';
import { Ng5SliderModule } from 'ng5-slider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatSliderModule, MatIconModule, MatStepperModule, MatMenuModule, MatTableModule } from '@angular/material';
import { ModalComponent } from '../program/setting/modal/modal.component';
import { SettingComponent } from './setting/setting.component'
import { CustomFormsModule } from 'ng2-validation';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { NgFileDragDropModule } from 'ng-file-drag-drop';

@NgModule({
  entryComponents: [ ModalComponent],
  declarations: [
    HomeComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    ModalComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatSliderModule,
    Ng5SliderModule,
    NgxUiLoaderModule,
    MatIconModule,
    CommonModule,
    MatStepperModule,
    MatMenuModule,
    ProgramRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule,
    AutocompleteLibModule,
    MatTableModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCgd-rD47NFwKVpQ30skw_D-qWUMHrxjO4',
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    NgFileDragDropModule,
  ],
  exports: [
    HomeComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    SettingComponent
    // ProgramComponent
  ],
  providers: [
    ThemeService
    // ...services
  ],
})
export class ProgramModule { }

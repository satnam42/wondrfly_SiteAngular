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
import { NgFileDragDropModule } from 'ng-file-drag-drop';
import { ProgramComponent } from './program.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';





@NgModule({
  entryComponents: [ ModalComponent],
  declarations: [
    ProgramComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    ModalComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxSliderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCgd-rD47NFwKVpQ30skw_D-qWUMHrxjO4',
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    NgFileDragDropModule,
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

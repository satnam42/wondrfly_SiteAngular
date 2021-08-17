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


@NgModule({
  declarations: [SearchComponent, OnlineProgramsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd,
    AgmCoreModule,  
    NgxSliderModule
  ]
})
export class SearchModule { }

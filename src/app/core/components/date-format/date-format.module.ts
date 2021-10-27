import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatComponent } from './date-format.component';



@NgModule({
  declarations: [DateFormatComponent],
  imports: [
    CommonModule,

  ],
  exports:[DateFormatComponent]
})
export class DateFormateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from './drag-drop.component';
import { NgxFileDropComponent, NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [DragDropComponent],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports:[DragDropComponent]
})
export class DragDropModule { }

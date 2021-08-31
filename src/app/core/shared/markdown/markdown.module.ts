import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdwonPipe } from './markdwon.pipe';



@NgModule({
  declarations: [MarkdwonPipe],
  imports: [
    CommonModule
  ],
  exports:[MarkdwonPipe]
})
export class MarkdownModule { }

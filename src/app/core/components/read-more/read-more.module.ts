import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from './read-more.component';
import { MarkdownModule } from '../../shared/markdown/markdown.module';



@NgModule({
  declarations: [ReadMoreComponent],
  imports: [
    CommonModule,
    MarkdownModule
  ],
  exports:[ReadMoreComponent]
})
export class ReadMoreModule { }

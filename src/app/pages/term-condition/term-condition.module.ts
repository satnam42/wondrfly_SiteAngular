import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CoreModule } from 'src/app/core/core.module';
import { TermConditionComponent } from './term-condition.component';

const routes: Routes = [
  {
    path: '', component: TermConditionComponent,
  }
]
@NgModule({
  declarations: [TermConditionComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class TermConditionModule { }

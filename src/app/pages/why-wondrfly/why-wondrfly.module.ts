import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { WhyWondrflyComponent } from './why-wondrfly.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
const routes: Routes = [
  {
    path: '', component: WhyWondrflyComponent,
  }
]
@NgModule({
  declarations: [WhyWondrflyComponent],
  imports: [
    CoreModule,
    CommonModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class WhyWondrflyModule { }

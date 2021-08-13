import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy.component'
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MarkdwonPipe } from 'src/app/core/shared/markdwon.pipe';
const routes: Routes = [
  {
    path: '', component: PrivacyPolicyComponent,
  }
]
@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    CoreModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class PrivacyPolicyModule { }

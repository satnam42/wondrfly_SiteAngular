import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbassadorPolicyComponent } from './ambassador-policy.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '', component: AmbassadorPolicyComponent,
  }
]

@NgModule({
  declarations: [AmbassadorPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class AmbassadorPolicyModule { }

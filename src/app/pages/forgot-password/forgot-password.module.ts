import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


const routes: Routes = [
  {
    path: '', component: ForgotPasswordComponent,
  }
]

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule,
    RouterModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }

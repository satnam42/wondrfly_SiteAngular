import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ForgotPasswordComponent},
];

@NgModule({
  declarations: [
    ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    LazyLoadImageModule,
    FormsModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }

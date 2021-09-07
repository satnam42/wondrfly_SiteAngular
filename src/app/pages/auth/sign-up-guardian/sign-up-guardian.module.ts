import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpGuardianComponent } from './sign-up-guardian.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path: '', component: SignUpGuardianComponent},
];
@NgModule({
  declarations: [
    SignUpGuardianComponent,
],
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
export class SignUpGuardianModule { }

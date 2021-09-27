import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SocialModule } from 'src/app/core/components/social-login/social-login.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: LoginComponent},
];
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    LazyLoadImageModule,
    FormsModule,
    NgxUiLoaderModule,
    SocialModule,
    RouterModule.forChild(routes)

  ]
})
export class LoginModule { }

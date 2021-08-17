import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPopupComponent } from './signup-popup.component';
import { SocialLoginModule } from '../social-login/social-login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SignupPopupComponent],
  imports: [
    CommonModule,
    SocialLoginModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule
  ],
  exports:[SignupPopupComponent]
})
export class SignupPopupModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPopupComponent } from './signup-popup.component';
import { SocialLoginModule } from '../social-login/social-login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SignupPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    SocialLoginModule,
    RouterModule
  ],
  exports:[SignupPopupComponent]
})
export class SignupPopupModule { }

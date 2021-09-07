import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPopupComponent } from './signup-popup.component';
import { SocialModule } from '../social-login/social-login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SignupPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    SocialModule
  ],
  exports:[SignupPopupComponent]
})
export class SignupPopupModule { }

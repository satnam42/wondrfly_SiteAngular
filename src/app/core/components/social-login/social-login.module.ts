import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLoginComponent } from './social-login.component'

@NgModule({
  declarations: [SocialLoginComponent],
  imports: [
    CommonModule,
  ],
  exports:[SocialLoginComponent],
})
export class SocialLoginModule { }

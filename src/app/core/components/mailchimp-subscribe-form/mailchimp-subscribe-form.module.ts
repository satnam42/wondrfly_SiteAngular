import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailchimpSubscribeForm } from './mailchimp-subscribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MailchimpSubscribeForm],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[MailchimpSubscribeForm]
})
export class MailchimpSubscribeFormModule { }

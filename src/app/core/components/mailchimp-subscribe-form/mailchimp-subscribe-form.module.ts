import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailchimpSubscribeForm } from './mailchimp-subscribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [MailchimpSubscribeForm],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
  ],
  exports:[MailchimpSubscribeForm]
})
export class MailchimpSubscribeFormModule { }

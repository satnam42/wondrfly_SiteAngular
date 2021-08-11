import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
	selector: 'mailchimp-subscribe-form',
	templateUrl: './mailchimp-subscribe-form.component.html'
})
export class MailchimpSubscribeForm {
	submitted = false;
	mailChimpEndpoint = 'https://wondrfly.us6.list-manage.com/subscribe/post-json?u=50d4a655c918bd43244bd72a1&amp;id=f53dcd12e8&';
	constructor(private http: HttpClient, private toastyService: ToastyService) { }
	emailControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	submit() {
		if (this.emailControl.status === 'VALID') {
			const params = new HttpParams()
				.set('EMAIL', this.emailControl.value)
				.set('b_123abc123abc123abc123abc123abc123abc', ''); // hidden input name
			const mailChimpUrl = this.mailChimpEndpoint + params.toString();
      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
			this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
					this.submitted = true;
					if(response.result=='success'){
						this.toastyService.success({ title: '', msg: response.msg })
					}
					else{
						this.toastyService.error({ title: '', msg:this.emailControl.value +' is already subscribed to Wondrfly' })
					}
			}, error => {
				this.toastyService.error({ title: '', msg: error })

			});
		}
	}
}
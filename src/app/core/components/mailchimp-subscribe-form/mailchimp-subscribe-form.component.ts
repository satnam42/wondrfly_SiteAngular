import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service.service';


// interface MailChimpResponse {
//   result: string;
//   msg: string;
// }

@Component({
	selector: 'mailchimp-subscribe-form',
	template: `
  <form [formGroup]="emailControl" (ngSubmit)="submit()">
  <div class="input-group">
      <input type="text" class="form-control" [formControl]="emailControl"  placeholder="example@domain.com">
      <div class="input-group-append">
          <button [disabled]="emailControl.invalid" class="Submit_btn"  type="submit">Submit</button>
      </div>
  </div>
</form>
`
})
export class MailchimpSubscribeForm {
	submitted = false;
	// mailChimpEndpoint = 'https://wondrfly.us6.list-manage.com/subscribe/post-json?u=50d4a655c918bd43244bd72a1&amp;id=f53dcd12e8&';
	constructor(private http: HttpClient,
		private toastr: ToastrService,
		private apiService: ApiService) { }
	emailControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	// subscribe to Newslatter
	submit() {
		let payload = {
			email: this.emailControl.value,
			tags: [
				"Newslatter"
			]
		}
		if (this.emailControl.status === 'VALID') {
			this.apiService.subscribeToMailchimpNewsletter(payload).subscribe((res: any) => {
				if (res.isSuccess) {
					this.toastr.info('Thank you for subscribing!')
				}
				else {
					this.toastr.error(this.emailControl.value + ' is already subscribed!')
				}
			})
		}
	}
}

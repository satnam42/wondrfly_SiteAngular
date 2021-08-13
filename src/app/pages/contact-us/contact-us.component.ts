import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsForm:FormGroup;
  title = 'Contact us for Best Kids Activities and Programs - Wondrfly';
  constructor(public auth:AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private apiservice: ApiService,
    private toastr: ToastrService,
    private ngxLoader:NgxUiLoaderService) {
  }
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: `If you have any questions or concerns about Wondrfly's online classes, activites or programs for kids? Contact us over phone or mail or fill the form below. ` }
    );
    this.contactUsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', ),
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),

    });
  }
  contactUs() {
    this.ngxLoader.start();
    this.apiservice.contactUs(this.contactUsForm.value).subscribe((res: any) => {
      this.ngxLoader.stop();
      if(res.isSuccess){ 
        this.contactUsForm.reset();
        // this.toastyService.success({ title: 'Success', msg: res.data }) 
      }
      else { 
        // this.toastyService.error({ title: 'Error', msg: res.error }) 
      } 
});
this.ngxLoader.stop();
  }
}

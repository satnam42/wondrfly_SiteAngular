import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  otpSendForm: FormGroup;
  otpVerifyForm: FormGroup;
  passwordResetForm: FormGroup;
  isForgot = true;
  isOTP = false;
  isNewPassword = false;
  isConfirmPassword = false;
  credentials = {
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
    otpToken: '',
  }
 
  forgotImage = '';
  forgotImages = ['assets/preOnboarding/1.jpg',
  'assets/preOnboarding/2.jpg',
  'assets/preOnboarding/3.jpg',
  'assets/preOnboarding/4.jpg',
  'assets/preOnboarding/5.jpg',
  'assets/preOnboarding/6.jpg',
  'assets/preOnboarding/7.jpg',
  'assets/preOnboarding/8.jpg',
  'assets/preOnboarding/9.jpg',
  'assets/preOnboarding/10.jpg',
  'assets/preOnboarding/11.jpg',   
  ]

  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    
    private titleService: Title,
    private metaTagService: Meta,
  ) {
  }
  otpRequest() {
    window.scroll(0, 0);
     var email: any = this.credentials.email.toLowerCase();
    this.credentials.email = email;
    this.ngxLoader.start();
    this.apiservice.otpRequest(this.credentials.email).subscribe((res: any) => {
      console.log('resss', res)
      this.ngxLoader.stop();
      if (res.isSuccess === true) {
        this.isOTP = true;
        this.isNewPassword = false;
        this.isForgot = false;
        this.credentials.otpToken = res.message.otpToken
    }
      else {
        this.isForgot = true;
        this.isOTP = false;
        this.isNewPassword = false;
        // this.toastyService.error({ title: '', msg: res.error })
      }
    });
  }
  otpVerify() {
    window.scroll(0, 0);
    this.ngxLoader.start();
    this.apiservice.otpVerify(this.credentials).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.isSuccess) {
        this.isOTP = false;
        this.isNewPassword = true;
        this.isForgot = false;
        // this.toastyService.success({ title: '', msg: res.message.message })
      }

      else {
        this.isOTP = true;
        this.isNewPassword = false;
        this.isForgot = false;
        let msg = 'Something went Wrong!';
        // this.toastyService.error({ title: '', msg: res.error })
        // this.snack.open(msg, 'OK', { duration: 5000 });
      }
    });
  }
  resetPassword() {
    window.scroll(0, 0);
    this.ngxLoader.start();
    this.apiservice.forgotPassword(this.credentials).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.isSuccess) {
        this.router.navigate(['/login']);
        // this.toastyService.success({ title: '', msg: res.message.message })

        // this.snack.open(resetPasswordResponse, 'OK', { duration: 5000 });
      }
      else {
        this.isOTP = false;
        this.isNewPassword = true;
        this.isForgot = false;
        // this.toastyService.error({ title: '', msg: res.error })
      }

    });
  }
  cancel() {
    this.router.navigate(['/login']);
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.forgotImages.length);
    this.forgotImage = this.forgotImages[num];
  }
  ngOnInit() {
    let  title = 'Forgot your Password - Wondrfly'
    this.titleService.setTitle(title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Did you forget your password? Please enter the email that you used to register and we'll send you a link to get back into your account." }
    );
    this.randomImage();
    window.scroll(0, 0);
    this.otpSendForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.otpVerifyForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });

    let newPassword = new FormControl('', [Validators.required]);
    let confirmPassword = new FormControl('', [Validators.required,
    CustomValidators.equalTo(newPassword)]);
    this.passwordResetForm = new FormGroup({
      newPassword: newPassword,
      confirmPassword: confirmPassword

    });
  }

}

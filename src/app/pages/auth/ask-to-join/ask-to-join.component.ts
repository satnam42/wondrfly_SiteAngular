import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from 'src/app/core/services';
import { CustomValidators } from 'ng2-validation';
import { Globals } from 'src/app/core/common/imageLoader';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthsService } from 'src/app/core/services/auths.service';
@Component({
  selector: 'ask-to-join',
  templateUrl: './ask-to-join.component.html',
  styleUrls: ['./ask-to-join.component.css']
})
export class AskToJoinComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'https://i.imgur.com/QsFAQso.jpg';
  blogUrl = environment.blogsUrl;
  parentForm: FormGroup;
  providerForm: FormGroup;

  userData: any = {
    firstName: '',
    email: '',
    password: '',
    confirmPassword:'',
    role: 'parent'
  }
  providerData: any = {
    firstName: '',
    email: '',
    type: '',
    password: '',
    confirmPassword:'',
    role: 'provider'
  }
  message: string = 'Registered Successfully!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  signUpImage = '';
  signUpImages = ['assets/preOnboarding/1.jpg',
  'assets/preOnboarding/2.jpg',
  'assets/preOnboarding/3.jpg',,
  'assets/preOnboarding/6.jpg',
  'assets/preOnboarding/11.jpg',
  ]
  constructor(private auth:AuthsService,
    public imageLoader: Globals) {
  }
  onPassword() {
    this.hide = !this.hide;
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.signUpImages.length);
    this.signUpImage = this.signUpImages[num];
  }
  askToJoin() {
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
    //   this.apiservice.addUser(this.userData).subscribe((res: any) => {

    // })

  }



  ngOnInit() {
    this.randomImage();
    window.scroll(0, 0);

    let password2 = new FormControl("", [Validators.required]);
    let confirmPassword2 = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password2),
    ]);
    this.parentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password2,
      confirmPassword : confirmPassword2
      // rememberMe: new FormControl(false)
    });
  }
}

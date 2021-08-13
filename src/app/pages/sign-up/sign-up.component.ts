import { Component, OnInit } from '@angular/core';
import { AuthsService } from '../../core/services/auths.service';
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
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
  title = "Complete your Profile | Sign Up to Join Kids' Classes - Wondrfly";

  message: string = 'Registered Successfully!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  signUpImage = '';
  signUpImages = ['assets/preOnboarding/1.jpg',
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
  constructor(private auth:AuthsService,
    private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private store: LocalStorageService,
    private titleService: Title,
    private metaTagService: Meta,
    public imageLoader: Globals) {
  }
  onPassword() {
    this.hide = !this.hide;
  }
  selectParent() {
    this.userData.role = "parent";
  }
  selectProvider() {
    this.userData.role = "provider";
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.signUpImages.length);
    this.signUpImage = this.signUpImages[num];
  }
  signup() {
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
    if (this.userData.role === "parent") {
      axios
      .post(`${this.blogUrl}/auth/local/register`, {
        username: this.userData.firstName,
        email: this.userData.email,
        password: 'strapipassword',
      })
      .then(response => {
        console.log('bloguser data parent', response);
        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);
      this.ngxLoader.start();
      this.apiservice.addUser(this.userData).subscribe((res: any) => {
        console.log('parentADDED', res)
        if (res.isSuccess === true) {
          this.store.setObject('userData', res.data);
          this.store.setItem('token', res.data.token);
          // this.toastyService.success({ title: 'Success', msg: this.message });
          this.router.navigate(['loginParent']);
        }
        else {
          // this.toastyService.error({ title: '!', msg: res.error })
        }
      });
        }
      }).catch(error => {
        // Handle error.
        console.log('An error occurred:',  error.response);
        // this.toastyService.error({ title:'', msg: error.response.data.data[0].messages[0].message })
      });
    }

    if (this.userData.role === "provider") {
      axios
      .post(`${this.blogUrl}/auth/local/register`, {
        username: this.providerData.firstName,
        email:this.providerData.email,
        password: 'strapipassword',
      })
      .then(response => {
        console.log('bloguser data provider',response);
        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);
          let email = this.providerData.email.toLowerCase();
          this.providerData.email = email;
        

      this.ngxLoader.start();
      this.apiservice.addUser(this.providerData).subscribe((res: any) => {
        this.ngxLoader.stop();
        console.log('resssssss', res)
        if (res.isSuccess === true) {
          this.store.setObject('userData', res.data);
          this.store.setItem('token', res.data.token);
          // this.toastyService.success({ title: 'Success', msg: this.message });
          this.router.navigate(['loginProvider']);
        } else {
          // this.toastyService.error({ title: '!', msg: res.error })
        }
      });
        }
      }).catch(error => {
        // Handle error.
        console.log('An error occurred:',  error.response);
        // this.toastyService.error({ title:'', msg: error.response.data.data[0].messages[0].message })
      });
           
    }
  }



  ngOnInit() {
    if(this.auth.currentUser()){
      this.router.navigate(['']);
    }
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Sign up for free and create a parent account by filling the details below. Visit Wondrfly's website and Sign Up now!" }
    );
    this.randomImage();
    window.scroll(0, 0);
    let password = new FormControl("", [Validators.required]);
    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.providerForm = new FormGroup({
      // type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password,
      confirmPassword : confirmPassword
      // rememberMe: new FormControl(false)
    });

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

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/about-beta1.png';
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
  signUpImageTag = '';
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
  signUpImageTgs = [
    'Activities and Games for Toddlers',
  'Activities and Games for Kids',
  'Fun Learning Activities',
  'Fun Activities for Toddlers',
  'Kids Fun Activities',
  'Smiling Kids',
  'Fun Activities',
  'Kids Games And Activities',
  'Fun Games for Kids',
  'Learning Activities for Toddlers',
  'Activities for Kids',
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
    this.signUpImageTag  = this.signUpImageTgs[num]
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
        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);
      this.ngxLoader.start();
      this.apiservice.addUser(this.userData).subscribe((res: any) => {
        if (res.isSuccess === true) {
          this.store.setObject('CurrentUserWondrfly', res.data);
          this.store.setItem('currentUserWondrflyToken', res.data.token);
          // this.toastr.info( 'Success',  this.message);
          this.router.navigate(['login-parent']);
        }
        else {
          this.toastr.error(res.error )
        }
      });
        }
      }).catch(error => {
        this.toastr.error( error.response.data.data[0].messages[0].message)
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
        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);
          let email = this.providerData.email.toLowerCase();
          this.providerData.email = email;


      this.ngxLoader.start();
      this.apiservice.addUser(this.providerData).subscribe((res: any) => {
        this.ngxLoader.stop();
        if (res.isSuccess === true) {
          this.store.setObject('CurrentUserWondrfly', res.data);
          this.store.setItem('currentUserWondrflyToken', res.data.token);
          // this.toastr.info('Success', this.message );
          this.router.navigate(['loginProvider']);
        } else {
          this.toastr.error( res.error)
        }
      });
        }
      }).catch(error => {
        this.toastr.error(  error.response.data.data[0].messages[0].message)
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
    this.metaTagService.addTag(
      { name: 'keywords', content: 'create your account, Create Your Wondrfly Account'}
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from 'src/app/core/services';
import { Globals } from 'src/app/core/common/imageLoader';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sign-up-guardian',
  templateUrl: './sign-up-guardian.component.html',
  styleUrls: ['./sign-up-guardian.component.css']
})
export class SignUpGuardianComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'https://i.imgur.com/QsFAQso.jpg';
  blogUrl = environment.blogsUrl;
  guardianForm: FormGroup;
  userData: any = {
    firstName: '',
    email: '',
    password: '',
    parentId: '',
    childId: '',
    role: 'parent'
  }
  message: string = 'Registered Successfully!';
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
  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private store: LocalStorageService,
    public imageLoader: Globals,
    private toastr: ToastrService,) {
  }
  onPassword() {
    this.hide = !this.hide;
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.signUpImages.length);
    this.signUpImage = this.signUpImages[num];
  }


  signup() {
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
    axios
    .post(`${this.blogUrl}/auth/local/register`, {
      username: this.userData.firstName,
      email: this.userData.email,
      password: 'strapipassword',
    })
    .then(response => {
      console.log('bloguser data parent', response);
      if (response.status === 200) {
        this.store.setObject('strapiData', response.data);
        this.store.setItem('jwt', response.data.jwt);

    this.ngxLoader.start();
    this.apiservice.signupGuardian(this.userData).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('resss', res);
      if (res.isSuccess) {
        this.router.navigate(['/login']);
        this.toastr.info('Success',this.message);
      }else {
        this.toastr.error(res.error, 'ok!');
        this.toastr.info('!', res.error );
      }
    });
        }
      }).catch(error => {
        // Handle error.
        console.log('An error occurred:',  error.response);
        this.toastr.info('!', error.response.data.data[0].messages[0].message)
      });
  }


  ngOnInit() {
    this.randomImage();
    window.scroll(0, 0);
    this.guardianForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}

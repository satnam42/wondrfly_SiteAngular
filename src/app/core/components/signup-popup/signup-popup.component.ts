import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {SocialUser } from 'angularx-social-login';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Globals } from '../../common/imageLoader';
import { LocalStorageService } from '../../services';
import { ApiService } from '../../services/api.service.service';
import { AuthsService } from '../../services/auths.service';

@Component({
  selector: 'app-signup-popup',
  template: `
  <!----------------------------------------- Signup Modal ------------------------------------------------------->

<div class="verification_outer">
    <div class="tab_outer">
        <div class="tab-content">
            <div class="tab-pane active" id="parent" role="tabpanel">
                    <div class="popup_img">
                        <img src="assets/logo.png">
                        </div>
                        <div class="popup_maintext">
                        Find the best activities for
                        <br>
                        your kids!
                        </div>
                        <div class="popup_normal_text">
                        Sign up for a free acount
                        </div>
                        <app-social-login [role]="'parent'"></app-social-login>
                        <div class="row">
                        <div class="col-5">
                        <hr>
                        </div>
                        <div class="col-2">
                        or
                        </div>
                        <div class="col-5">
                        <hr>
                        </div>
                        </div>

                        <div class="form" [formGroup]="parentForm">
                    <div class="form-group">
                        <label>Parent Name</label>
                        <div class="input_outer">
                            <input type="text" class="form-control" placeholder="Enter name"
                                [formControl]="parentForm.controls['name']"
                                [(ngModel)]="userData.firstName">
                            <p class="cant_blank"
                                *ngIf="parentForm.controls['name'].hasError('required') && parentForm.controls['name'].touched">
                                CAN'T LEAVE IT BLANK</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <div class="input_outer">
                            <input type="text" class="form-control" placeholder="Enter email"
                                [formControl]="parentForm.controls['email']"
                                [(ngModel)]="userData.email">
                            <p class="cant_blank"
                                *ngIf="parentForm.controls['email'].hasError('required') && parentForm.controls['email'].touched">
                                CAN'T LEAVE IT BLANK</p>
                            <p class="cant_blank"
                                *ngIf="parentForm.controls['email'].hasError('email') && parentForm.controls['email'].touched">
                                INVALID EMAIL ADDRESS</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Select Password</label>
                        <div class="input_outer password">
                            <input type="password" class="form-control" placeholder="Type"
                                placeholder="Select a Strong Password"
                                [formControl]="parentForm.controls['password']"
                                [(ngModel)]="userData.password" [type]="hide ? 'password' : 'text'">
                            <mat-icon class="field-icon" *ngIf="hide" (click)="onPassword()"><i
                                    class="far fa-eye"></i></mat-icon>
                            <mat-icon class="field-icon" *ngIf="!hide" (click)="onPassword()"> <i
                                    class="far fa-eye-slash"></i></mat-icon>

                            <p class="cant_blank"
                                *ngIf="parentForm.controls['password'].hasError('required') && parentForm.controls['password'].touched">
                                CAN'T LEAVE IT BLANK</p>

                        </div>
                    </div>

                    <div class="row forgot_password">
                        <div class="col-12 forgot_text">
                            <p> By clicking sign up I hereby agree with Letsplay’s
                                <a [routerLink]="['/term-condition']">Terms & Conditions</a></p>
                        </div>
                    </div>
                    <div class="sign_in_btn">
                        <button class="SignBtn" (click)="signup()" [disabled]="parentForm.invalid">Sign
                            up</button>
                    </div>
                </div>
                <div class="row forgot_password">
                    <div class="col-12 forgot_text">
                        <p>Already a member? <a routerLink="/login">SIGN In</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
`,
  styleUrls: ['./signup-popup.component.css']
})
export class SignupPopupComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  user: SocialUser;
  userGoogle: SocialUser;
  loggedIn: boolean;
  isMap: boolean = true;
  usersData: any = {};
  pickDate: any;
  pageNo: number = 1;
  pageSize: number;
  forums: any;

  parentForm: FormGroup;
  userData: any = {
    firstName: '',
    email: '',
    password: '',
    role: 'parent',
    name: '',

    facebookId:'',

    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
  }

  message: string = 'Registered Successfully!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  image = '';
  images = ['assets/signin.jpg',
    'assets/sign_in_img.jpg',
    'assets/otp_background.png',
    'assets/otp2.jpg',
    'assets/registered_email.jpg',
  ]
  googleData: SocialUser;
  blog: any;


  constructor(private router: Router,
    private apiservice: ApiService,
    private toastr: ToastrService,
    public auth: AuthsService,
    public imageLoader: Globals,
    private ngxLoader: NgxUiLoaderService,
    private store: LocalStorageService) {
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

        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);

      this.ngxLoader.start();
      this.apiservice.addUser(this.userData).subscribe((res: any) => {
        this.ngxLoader.stop();
        if (res.isSuccess === true) {

          window.document.getElementById("close_modal").click();
          this.store.setObject('userData', res.data);
          this.store.setItem('token', res.data.token);
          this.toastr.info('Success', this.message );
          this.router.navigate(['parent/login-parent']);
        }
        else {
          this.toastr.info(res.error )
        }
      })
    }
  }).catch(error => {
    this.toastr.info(  error.response.data.data[0].messages[0].message )
  });
  }



  ngOnInit() {
    this.parentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required])
      // rememberMe: new FormControl(false)
    });
  }

}

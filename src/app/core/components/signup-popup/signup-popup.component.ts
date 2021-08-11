import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import axios from 'axios';
import { ToastyService } from 'ng2-toasty';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Globals } from '../../common/imageLoader';
import { Category } from '../../models';
import { LocalStorageService } from '../../services';
import { ApiService } from '../../services/api.service.service';
import { AuthsService } from '../../services/auths.service';
import { DataService } from '../../services/dataservice.service ';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
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
    private dataservice: DataService,
    public auth: AuthsService,
    public imageLoader: Globals,
    private ngxLoader: NgxUiLoaderService,
    private toastyService: ToastyService,
    private store: LocalStorageService,private authService: AuthService) {
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
        console.log('bloguser data parent', response);
        if(response.status===200){
          this.store.setObject('strapiData', response.data);
          this.store.setItem('jwt', response.data.jwt);

      this.ngxLoader.start();
      this.apiservice.addUser(this.userData).subscribe((res: any) => {
        this.ngxLoader.stop();
        if (res.isSuccess === true) {
           console.log('resssssss', res)
          window.document.getElementById("close_modal").click();
          this.store.setObject('userData', res.data);
          this.store.setItem('token', res.data.token);
          this.toastyService.success({ title: 'Success', msg: this.message });
          this.router.navigate(['loginParent']);
        }
        else {
          this.toastyService.error({ title: '!', msg: res.error })
        }
      })
    }
  }).catch(error => {
    // Handle error.
    console.log('An error occurred:',  error.response);
    this.toastyService.error({ title:'', msg: error.response.data.data[0].messages[0].message })
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

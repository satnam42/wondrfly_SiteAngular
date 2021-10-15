import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';
import { LocalStorageService } from '../../services';
import { ApiService } from '../../services/api.service.service';
import { AuthsService } from '../../services/auths.service';

@Component({
  selector: 'app-social-login',
  template: `

<div class="fb_button">
<span class="fb_icon"><img src="assets/Vector.svg"></span>
<a  (click)="signInWithFB()">{{loginOrSignUp}} with Facebook</a>
</div>
<div class="google_button">
<span class="go_icon"><img src="assets/Group.svg"></span>
<a  (click)="signInWithGoogle()" >{{loginOrSignUp}} with Google</a>
</div>`,
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
  loginOrSignUp='Sign Up';
  routeName: string;
  blogUrl = environment.blogsUrl;
  @Input() role: any;
  // user: SocialUser;
  // userGoogle: SocialUser;
  loggedIn: boolean;
  isMap: boolean = true;
  usersData: any = {};
  pickDate: any;
  pageNo: number = 1;
  pageSize: number;
  forums: any;
  categories: any = new Category;
  filterData: any = {
    categoryId: '',
    activityName: '',
    activityDate: ''
  }
  data: SocialUser;
  user = new User;
  constructor(private socialAuthService: SocialAuthService,
              private apiservice : ApiService,
              private router : Router,
              private ngxLoader : NgxUiLoaderService,
              public auth: AuthsService,
              private toastr: ToastrService,
              private store : LocalStorageService) {
                this.routeName = router.url;

                if(this.routeName=='/login'){ this.loginOrSignUp='Log In' }
              }

  ngOnInit() {
  }


  signInWithFB() {

    if(localStorage.getItem("token") === null){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      // this.user = user;
      this.loggedIn = (user != null);

      if(user){
        let facebookUser = new User;
        facebookUser.facebookId = user.id;
        facebookUser.email = user.email;
        facebookUser.firstName = user.firstName;
        facebookUser.lastName = user.lastName;
        facebookUser.about = '';
        facebookUser.healthAndSafety = [];
        facebookUser.role = this.role;
        this.ngxLoader.start();
        this.apiservice.signupWithFb(facebookUser).subscribe((res: any) => {
          if(res.isSuccess === true){
            let user = new User;
            user =res.data;
            this.strapiSignup()
        }
          this.ngxLoader.stop();
        })
  }
})
  }
  }

  signInWithGoogle() {
    if(localStorage.getItem("token") === null){
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      // this.userGoogle = user;
      this.loggedIn = (user != null);
      if(user){
        let googleUser = new User;
        googleUser.googleId = user.id;
        googleUser.email = user.email;
        googleUser.firstName = user.firstName;
        googleUser.lastName = user.lastName;
        googleUser.about = '';
        googleUser.healthAndSafety = [];
        googleUser.role = this.role;
        this.ngxLoader.start();
        this.apiservice.signupWithGoogle(googleUser).subscribe((res: any) => {
          if(res.isSuccess === true){

            this.user =res.data;
            this.strapiSignup()
  }
          this.ngxLoader.stop();
        })
      }
    })

  }
  }



  strapiLogin(){
    axios
  .post(`${this.blogUrl}/auth/local`, {
    password: 'strapipassword',
    identifier:  this.user.email
  })
  .then(response => {
    if(response.status===200){
      this.auth.setUser(this.user);
      this.store.setObject('strapiData', response.data);
      this.store.setItem('jwt', response.data.jwt);
      if (this.user.role === "provider"){
        this.router.navigate(['provider/login-provider'])
        // this.router.navigate(['profile',res.data.id])
   }
   else{ this.router.navigate(['parent/login-parent']);
   }
  }
}).catch(error => {
  this.toastr.error( error.response.data.data[0].messages[0].message )
});
  }


strapiSignup(){
  axios
  .post(`${this.blogUrl}/auth/local/register`, {
    username: this.user.firstName,
    email: this.user.email,
    password: 'strapipassword',
  })
  .then(response => {
    if(response.status===200){
      this.auth.setUser(this.user);
      this.store.setObject('strapiData', response.data);
      this.store.setItem('jwt', response.data.jwt);
      if (this.user.role === "provider"){
        this.router.navigate(['provider/login-provider'])
        // this.router.navigate(['profile',res.data.id])
   }
   else{ this.router.navigate(['parent/login-parent']);
   }
}

  }).catch(error => {
    if(error.response.data.statusCode===400){
      this.strapiLogin()
    }else{
    this.toastr.error(error.response.data.data[0].messages[0].message)
    }
  });
}






}



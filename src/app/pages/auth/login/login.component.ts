import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from "src/app/core/services/api.service.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Globals } from "src/app/core/common/imageLoader";
import axios from "axios";
import { LocalStorageService } from "src/app/core/services";
import { User } from "src/app/core/models";
import { environment } from "src/environments/environment";
import { Meta, Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { AuthsService } from "src/app/core/services/auths.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
// import { User } from '../../core/models/index'
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  defaultImage = "https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif";
  errorImage = "assets/about-beta1.png";
  blogUrl = environment.blogsUrl;
  signinForm: FormGroup;
  credentials = {
    email: "",
    password: "",
    // systemDetail: {}
  };
  systemDetail:{
    browserName:any,
    ipAddress:any,
    osName:any
  }
  isLoading = false;
  hide: boolean = true;
  response: any;
  message: string = "Logged In Successfully!";
  action: boolean = true;
  activeDeactiveResponse: any;
  isModal = false;
  signInImage = "";
  signInImages = [
    "assets/preOnboarding/1.jpg",
    "assets/preOnboarding/2.jpg",
    "assets/preOnboarding/3.jpg",
    "assets/preOnboarding/4.jpg",
    "assets/preOnboarding/5.jpg",
    "assets/preOnboarding/6.jpg",
    "assets/preOnboarding/7.jpg",
    "assets/preOnboarding/8.jpg",
    "assets/preOnboarding/9.jpg",
    "assets/preOnboarding/10.jpg",
    "assets/preOnboarding/11.jpg",
  ];
  user: any = new User();
  title = "Parent Log in | Find Online Kids Classes - Wondrfly";
  constructor(
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    public imageLoader: Globals,
    private toastr: ToastrService,
    public store: LocalStorageService,
    private deviceService: DeviceDetectorService,

  ) {}
  onPassword() {
    this.hide = !this.hide;
  }
  cancel(){
    this.router.navigate(["/"]);
  }

  randomImage() {
    const num = Math.floor(Math.random() * this.signInImages.length);
    this.signInImage = this.signInImages[num];
  }

  signin() {
    if (this.credentials.email) {
      let email = this.credentials.email.toLowerCase();
      this.credentials.email = email;
      // this.credentials.systemDetail = this.systemDetail
    }
    localStorage.removeItem("userId");
    this.auth.login(this.credentials).subscribe((res: any) => {
      this.user = res.data;
      if (res.isSuccess === true) {
        // ----------login strapi if user is register on wondrfly---------
        this.strapiLogin();
      } else {
        this.toastr.error(res.error);
      }
      this.ngxLoader.stop();
    });
  }

  activeDeactiveUser() {
    var booleanValue = true;
    this.ngxLoader.start();
    this.apiservice
      .activeDeactiveUser(this.response.data.id, booleanValue)
      .subscribe((activeDeactiveResponse: any) => {
        this.ngxLoader.stop();
        if (activeDeactiveResponse) {
          return this.signin();
        } else {
          this.toastr.error(activeDeactiveResponse.error);
        }
      });
    this.ngxLoader.stop();
  }
  onForgotPassword() {
    this.router.navigate(["/forgot-password"]);
  }
  ngOnInit() {
    this.systemDetail.browserName = this.detectBrowserName();
this.getIPAddress()
this.deviceDetector();
    console.log('browserName',this.systemDetail.browserName)
    if (this.auth.currentUser()) {
      this.router.navigate([""]);
    }
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: "description",
      content:
        "Log in now to your Wonderfly parent account. Don't have an account? Log In With Facebook.Or create an account.",
    });
    this.metaTagService.addTag({
      name: "keywords",
      content: "New Member Login",
    });
    window.scroll(0, 0);
    this.randomImage();
    this.signinForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.min(1)]),
      // rememberMe: new FormControl(false)
    });
  }

  // --------------------------------------login strapi---------------------------------------------------
  strapiLogin() {
    axios
      .post(`${this.blogUrl}/auth/local`, {
        password: "strapipassword",
        identifier: this.credentials.email,
      })
      .then((response) => {
        if (response.status === 200) {
          this.auth.setUser(this.user);
          this.store.setObject("strapiData", response.data);
          this.store.setItem("jwt", response.data.jwt);
           if (this.user.isOnBoardingDone && this.user.role === "parent") {
            // this.toastr.success(this.message);
            this.router.navigate(["parent/my-wondrfly"]);
          } else if (this.user.role === "parent" && !this.user.isOnBoardingDone) {
            // this.toastr.success(this.message);
            this.router.navigate(["parent/login-parent"]);
          } else if (this.user.role === "superAdmin") {
            // this.toastr.success("Please Login As Provider Or Parent Only!");
          }
        }
      })
      .catch((error) => {
        if (error.response.data.statusCode === 400) {
          // ----------signUp strapi if user is not register on strapi---------
          this.strapiSignup();
        } else {
          this.toastr.error(error.response.data.data[0].messages[0].message);
        }
      });
  }

  // --------------------------------------if user is not registerd in strapi------------------------------------
  strapiSignup() {
    axios
      .post(`${this.blogUrl}/auth/local/register`, {
        username: this.user.firstName,
        email: this.credentials.email,
        password: "strapipassword",
      })
      .then((response) => {
        if (response.status === 200) {
          this.auth.setUser(this.user);
          this.store.setObject("strapiData", response.data);
          this.store.setItem("jwt", response.data.jwt);
          if (this.user.isOnBoardingDone && this.user.role === "provider") {
            // this.toastr.success(this.message);
            this.router.navigate(["profile", this.user.id]);
          }  else if (this.user.isOnBoardingDone &&this.user.role === "parent") {
            // this.toastr.success(this.message);
            this.router.navigate(["parent/my-wondrfly"]);
          }
            else if (this.user.role === "parent" && !this.user.isOnBoardingDone) {
            // this.toastr.success(this.message);
            this.router.navigate(["parent/login-parent"]);
          } else if (this.user.role === "superAdmin") {
            // this.toastr.success(
            //   "You Are An Admin!",
            //   "Please Login As Provider Or Parent Only!"
            // );
          }
        }
      })
      .catch((error) => {
        this.toastr.error(error.response.data.data[0].messages[0].message);
      });
  }
// ---------detectBrowserName-------
  detectBrowserName() { 
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  // ---------detectIP Address-------
   getIPAddress(){  
this.apiservice.getIPAddress().subscribe((res:any)=>{  
      this.systemDetail.ipAddress=res.ip;  
      console.log('ipAddress',this.systemDetail.ipAddress)

    });    } 
    // ------OS detecting----
    deviceDetector() {
      this.systemDetail.osName = this.deviceService.getDeviceInfo().os;
      console.log('currentOS',this.systemDetail.osName);
    }
}

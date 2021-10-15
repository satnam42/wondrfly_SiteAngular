import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Globals } from 'src/app/core/common/imageLoader';
import { environment } from 'src/environments/environment';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ApiService } from 'src/app/core/services/api.service.service';
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
    role: 'parent',
    userId:''
  }
  isTerms: boolean;
  isParent: boolean;
  isbetaActivity:boolean;
  message: string = 'Your request submitted!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  signUpImage = '';
  signUpImages = ['assets/preOnboarding/1.jpg',
  'assets/preOnboarding/2.jpg',
  'assets/preOnboarding/3.jpg',
  'assets/preOnboarding/6.jpg',
  'assets/preOnboarding/11.jpg',
  ]
  constructor(private auth:AuthsService,
    private apiservice: ApiService,
    public imageLoader: Globals,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe(params => {
        if(params['id'].length>1){
        this.userData.userId = params['id'];
        }
      });
  }
  onPassword() {
    this.hide = !this.hide;
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.signUpImages.length);
    this.signUpImage = this.signUpImages[num];
  }
cancel(){
  this.router
  .navigateByUrl("", { skipLocationChange: true })
  .then(() => this.router.navigate(["/"]));
}

  askToJoin() {
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
      this.apiservice.askToJoin(this.userData).subscribe((res: any) => {
        console.log(res)
        if(res.isSuccess){
    // this.toastr.info(this.message)
        }
        else{this.toastr.error(res.error) }
    })

  }



  ngOnInit() {
    this.randomImage();
    window.scroll(0, 0);

    // let password2 = new FormControl("", [Validators.required]);
    // let confirmPassword2 = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password2),
    // ]);
    this.parentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', [Validators.required]),
      // password: password2,
      // confirmPassword : confirmPassword2
      // rememberMe: new FormControl(false)
    });
  }
}

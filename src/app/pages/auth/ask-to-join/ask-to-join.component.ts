import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Globals } from 'src/app/core/common/imageLoader';
import { environment } from 'src/environments/environment';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ApiService } from 'src/app/core/services/api.service.service';
import { MapsAPILoader } from '@agm/core';
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
  private geoCoder;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef;
  userData: any = {
    firstName: '',
    email: '',
    password: '',
    bookedActivityFor: '',
    lookingkidsActivityIn: '',
    lat: '',
    lng:  '',
    bookedActivityInLastMonths:  '',
    wantWondrflyBetaUserBecause:  '',
    occupation:  '',
    willActive: false,
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
  step1= true
  step2 = false
  constructor(private auth:AuthsService,
    private apiservice: ApiService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
    console.log(this.userData)
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
      bookedActivityFor:  new FormControl('', [Validators.required]),
      lookingkidsActivityIn:  new FormControl('', [Validators.required]),
      bookedActivityInLastMonths:  new FormControl('',),
      wantWondrflyBetaUserBecause:  new FormControl('', [Validators.required]),
      occupation:  new FormControl('',),
      willActive:  new FormControl('',),


      // password: password2,
      // confirmPassword : confirmPassword2
      // rememberMe: new FormControl(false)
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.parentForm.value.lookingkidsActivityIn = place.formatted_address;
          this.userData.lookingkidsActivityIn = place.formatted_address;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude
          this.userData.lat = String(place.geometry.location.lat());
          this.userData.lng = String(place.geometry.location.lng());
        });
      });
    });
  }
}

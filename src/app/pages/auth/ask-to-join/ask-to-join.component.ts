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
  currentYear = new Date().getFullYear()
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/about-beta1.png';
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
    lng: '',
    bookedActivityInLastMonths: '',
    wantWondrflyBetaUserBecause: '',
    occupation: '',
    willActive: false,
    role: 'parent',
    userId: '',
    ipAddress: ''
  }
  isGuardianInvitation = false;
  isTerms: boolean;
  isParent: boolean;
  isbetaActivity: boolean;
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
  step1 = true
  step2 = false
  disableApproveBtn = false;
  constructor(private auth: AuthsService,
    private apiservice: ApiService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public imageLoader: Globals,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.activatedRoute.queryParams.subscribe(params => {
      let name = params['name'];
      if (name === 'grown-ups') {
        this.isGuardianInvitation = true
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
  cancel() {
    this.router.navigate(["/"]);
  }

  askToJoin() {
    this.disableApproveBtn = true;
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
    if (this.isGuardianInvitation) {
      this.apiservice.guardianAsktojoin(this.userData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.disableApproveBtn = false;
          window.document.getElementById("openSuccessModal").click();
        } else {
          this.disableApproveBtn = false;
          this.toastr.error(res.error)
        }
      })
    }
    else {
      this.apiservice.askToJoin(this.userData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.disableApproveBtn = false;
          window.document.getElementById("openSuccessModal").click();
        }
        else {
          this.disableApproveBtn = false;
          this.toastr.error(res.error)
        }
      })
    }

  }

  // ---------getIPAddress-------

  getIPAddress() {
    this.apiservice.getIPAddress().subscribe((res: any) => {
      this.userData.ipAddress = res.ip;
    });
  }

  ngOnInit() {
    this.getIPAddress()
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
      password: new FormControl('', [Validators.required]),
      bookedActivityFor: new FormControl('', [Validators.required]),
      lookingkidsActivityIn: new FormControl('', [Validators.required]),
      bookedActivityInLastMonths: new FormControl('',),
      wantWondrflyBetaUserBecause: new FormControl('', [Validators.required]),
      occupation: new FormControl('',),
      willActive: new FormControl('',),


      // password: password2,
      // confirmPassword : confirmPassword2
      // rememberMe: new FormControl(false)
    });

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "us"}
       };
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,options);
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
  ngOnDestroy() {
    window.document.getElementById("close_modal").click();
  }
}

import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/core/models';
import { HeaderComponent } from 'src/app/core/components/header/header.component';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MapsAPILoader } from '@agm/core';
import { ElementRef, NgZone } from '@angular/core';
import { AuthsService } from 'src/app/core/services/auths.service';
import { MapTheme } from 'src/app/core/common/map-theme';

@Component({
  selector: 'app-login-provider',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css'],
})


export class LoginProviderComponent implements OnInit {
  providerForm: FormGroup;
  providerForm1: FormGroup;
  socialLinksForm: FormGroup;
  locationForm:FormGroup;
  providerForm3: FormGroup;
  fileData: File = null;
  provider = new User;
  providerId:any;
  isActive = false;
  selectedItem = ''
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  step6 = false;
  step7 = false;
  step8 = false;
  keyword = 'name';
  markerUrl = 'assets/location.svg';
  isSecondaryNumber:boolean=false;
  private geoCoder;
  progressBarVaue = 15;
  zoom: number = 2;
  latitude: Number;
  longitude: Number;
formData = new FormData();
providerImgURL: any
@ViewChild('search', { static: false }) searchElementRef: ElementRef;
  @ViewChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;
  categories: any = [];
  interests: any = [];
  selectable: boolean = true;
  disposableMasksProvided;
  qrCodeRegistration;
  staffHealthAndHygieneProtocols;
  dailyEquipment;
  sanitizerStations;
  limitedClassSizes;
  parentObservation;
  health_safety = [
    { name: 'Disposable Masks Provided', img: 'assets/disposable_mask.svg', status: false, type: 'disposableMasksProvided' },
    { name: 'OR Code Registration', img: 'assets/qr_code.svg', status: false, type: 'qrCodeRegistration' },
    { name: 'Staff Health And Hygiene Protocols', img: 'assets/staf_health.png', status: false, type: 'staffHealthAndHygieneProtocols' },
    { name: 'Daily Equipment', img: 'assets/daily_eqpt.svg', status: false, type: 'dailyEquipment' },
    { name: 'Sanitizer Stations', img: 'assets/sanitizer.svg', status: false, type: 'sanitizerStations' },
    { name: 'Limited Class Sizes', img: 'assets/limited_class.svg', status: false, type: 'limitedClassSizes' },
    { name: 'Parent Observation', img: 'assets/parent_ob.svg', status: false, type: 'parentObservation' },

  ]
  health = [
    {
      disposableMasksProvided: false,
      qrCodeRegistration: false,
      staffHealthAndHygieneProtocols: false,
      dailyEquipment: false,
      sanitizerStations: false,
      limitedClassSizes: false,
      parentObservation: false

    }
  ]
  providerLogoUrl: any;
  searchesCatg: any= [];
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private auth: AuthsService,
    public mapTheme: MapTheme
  ) {
    // var retrievedObject = localStorage.getItem('userData');
    this.providerId = auth.currentUser();
    console.log('res from local storage ',this.providerId)
    this.getUserById()

  }
  getUserById() {
    this.apiservice.getUserById(this.providerId.id).subscribe((res: any) => {
      this.provider = res.data;
     this.providerImgURL = this.provider.avatarImages
     this.providerLogoUrl= this.provider.provider_logo
      console.log('provider data', this.provider)
    });
  }
  providerImageSelect(event) {
    var response: any;
    this.fileData = event.target.files[0];
    this.formData.append('image', this.fileData);
        // --------------------preview image before upload ------------------------
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.providerImgURL = reader.result;
        };
              // -------------------------------------------------------------------------------
  }


  providerLogoSelect(event) {
    var response: any;
    this.fileData = event.target.files[0];
    this.formData.append('image', this.fileData);
        // --------------------preview image before upload ------------------------
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.providerLogoUrl = reader.result;
        };
              // -------------------------------------------------------------------------------
  }


  upDateHealthMeasure(type, indx) {
    if (this.provider.healthAndSafety.length > 0) {
      this.health = this.provider.healthAndSafety;
    }
    if (this.health_safety[indx].status === false) {
      this.health_safety[indx].status = true
    }
    else if (this.health_safety[indx].status = true) {
      this.health_safety[indx].status = false
    }
    for (let i in this.health) {
      let _typeof = Object.keys(this.health[i])
      _typeof.forEach(e => {
        if (type == e) {
          let healthType = this.health[0]
          healthType[type] = this.health_safety[indx].status
          this.provider.healthAndSafety[0] = healthType
        }
      });
    }
    console.log('health', this.provider.healthAndSafety)
  }
  updateProvider() {
    this.provider.interests = this.interests;
    this.provider.firstName = this.providerForm.value.firstName;
    this.provider.about = this.providerForm.value.about;
    this.provider.location = this.locationForm.value.location;
    this.provider.addressLine1 = this.locationForm.value.addressLine1;
    this.provider.phoneNumber = this.providerForm.value.phoneNumber;
    this.provider.facebook = this.socialLinksForm.value.facebook;
    this.provider.twitter = this.socialLinksForm.value.twitter;
    this.provider.linkedin = this.socialLinksForm.value.linkedin;
    this.provider.instagram = this.socialLinksForm.value.instagram;
    this.provider.website = this.socialLinksForm.value.website;
    console.log('before update provider date', this.provider);
    this.apiservice.updateProviderById(this.provider.id, this.provider).subscribe((res: any) => {
      console.log('responnse', res)
      if (res.isSuccess) {
        this.router.navigate(['/profile', this.provider.id]);
      }
      else {
        // this.toastyService.error({ title: '', msg: res.error })
      }
    });
  }

  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      console.log('catogsdsadasa', this.categories)
    });
  }
  selectSkills(t: any) {
    console.log('ttttttttt',t)
    if(t._id){t.id=t._id;
      t.active = !t.active;
    }
    const index: number = this.interests.indexOf(t.id);
    t.active = !t.active;
    if (this.interests.indexOf(t.id) === -1) {
      this.interests.push(t.id);
    }
    else if (index !== -1) {
      this.interests.splice(index, 1);
    }
    console.log('intrests', this.interests)
  }

  ngOnInit() {
    this.getCategoryList()
    window.scroll(0, 0);
    this.providerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
      secondaryPhonenumber: new FormControl('', [Validators.minLength(10)]),
    });
    this.providerForm1 = new FormGroup({
      addressLine1: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),


    });
    this.locationForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),

    });
    this.socialLinksForm = new FormGroup({
      website: new FormControl('', []),
      facebook: new FormControl('', []),
      instagram: new FormControl('', []),
      linkedin: new FormControl('', []),
      twitter: new FormControl('', []),

    });
    this.providerForm3 = new FormGroup({

      interests: new FormControl(['']),
    });

  }
  nextStep() {
    window.scroll(0, 0);
    if (this.step1) {
      if( this.provider.phoneNumber.length>9){
        this.step1 = false;
        this.step2 = true;
        this.progressBarVaue += 10;
      }
      else{
        // this.toastyService.error({ title: '', msg: "Please Fill Valid Phone Number" })
      }
   
    }
    else if (this.step2) {
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.locationForm.value.location = place.formatted_address;
            this.locationForm.value.addressLine1 =this.locationForm.value.location
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude 
            this.zoom = 12;
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.provider.lat = String(place.geometry.location.lat());
            this.provider.lng = String(place.geometry.location.lng());
          });
        });
      });
      this.step2 = false;
      this.step3 = true;
      this.progressBarVaue += 13;

    }
    else if (this.step3) {
      this.step3 = false;
      this.step4 = true;
      this.progressBarVaue += 13;
    }
    else if (this.step4) {
      this.apiservice.uploadUserImage(this.provider.id, this.formData).subscribe((res: any) => {
        console.log('upload image ress',res)
        this.getUserById()
      });
      this.step4 = false;
      this.step5 = true;
      this.progressBarVaue += 12;
    }
    else if (this.step5) {
      this.apiservice.uploadUserImage(this.provider.id, this.formData).subscribe((res: any) => {
        console.log('upload image ress',res)
        this.getUserById()
      });
      this.step5 = false;
      this.step6 = true;
      this.progressBarVaue += 14;
    }
    else if (this.step6) {
      this.step6 = false;
      this.step7 = true;
      this.progressBarVaue += 15;
    }
    else if (this.step7) {
      this.step7 = false;
      this.step8 = true;
      this.progressBarVaue += 100;
    }

  }
  backStep() {
    window.scroll(0, 0);
    if (this.step2) {
      this.step1 = true;
      this.step2 = false;
      this.progressBarVaue -= 10;
    }
    else if (this.step3) {
      this.step2 = true;
      this.step3 = false;
      this.progressBarVaue -= 13;
    }
    else if (this.step4) {
      this.step3 = true;
      this.step4 = false;
      this.progressBarVaue -= 13;
    }
    else if (this.step5) {
      this.step4 = true;
      this.step5 = false;
      this.progressBarVaue -= 12;
    }
    else if (this.step6) {
      this.step5 = true;
      this.step6 = false;
      this.progressBarVaue -= 14;
    }   
    else if (this.step7) {
      this.step6 = true;
      this.step7 = false;
      this.progressBarVaue -= 15;
    }
    else if (this.step8) {
      this.step7 = true;
      this.step8 = false;
      this.progressBarVaue -= 100;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.interests.push(event.option.value);
  }

  selectEvent(item) {
    this.interests.push(item._id);
    // item.active = !item.active;
    console.log('seleced cat',  this.interests);
    // console.log('user.skills', this.user.skills);
  }

  onFocused(e) {
    // do something when input is focused
  }

  onChangeSearch(key: string) {
    if(key.length>2){ 
    this.ngxLoader.start();
    this.apiservice.searchCategory(key).subscribe((res: any) => {
      this.searchesCatg = res.data;
      this.ngxLoader.stop()
    });
  }
  }

upload(){
  if(this.providerImgURL){
    this.nextStep()
  }
}

uploadLogo(){
  if(this.provider.provider_logo){
    this.nextStep()
  }
}

}

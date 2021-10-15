import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Child, User } from 'src/app/core/models';
import * as moment from 'moment';
import { MapsAPILoader } from '@agm/core';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-parent',
  templateUrl: './login-parent.component.html',
  styleUrls: ['./login-parent.component.css']
})
export class LoginParentComponent implements OnInit {
  addChildForm: FormGroup;
  locationForm:FormGroup;
  keyword = 'name';
  addChildData: any = new Child
  categoryIds = [];
  parent=new User;
  // ---------------autucomplete-------------
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: any = [];
  message: string = 'child added Successfully';
  categories: any = [];
  interests: any = [];
  kid = new Child;
  step1 = true;
  step2 = false;
  step3 = false;
  step4=false;
  step5=false
  title = 'Onboarding - Wondrfly';
  markerUrl = 'assets/location.svg';
  private geoCoder;
  progressBarVaue = 25;
  zoom: number = 2;
  latitude: Number;
  longitude: Number;
@ViewChild('search', { static: false }) searchElementRef: ElementRef;
  searchTags: any=[];
  searchesCatg: any=[];
  selectedTags: any=[];
  removedTag: any;
  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private titleService: Title,
    private metaTagService: Meta,
    private toastr: ToastrService,
  ) {
    var retrievedObject = localStorage.getItem('userData');
    this.parent = JSON.parse(retrievedObject);
  }
  logo() {
    this.router.navigate(['/search']);
  }

  // remove(indx): void {
  //   this.addChildData.interestInfo.splice(indx, 1);
  // }

  remove(t) {
    this.selectSkills(t)
    const index: number  = this.selectedTags.indexOf(t);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }

  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.addChildData.interestInfo.push(event.option.value);

  }

  openSearch() {
    this.router.navigate(['/search']);
  }

  validAge(){
    var birth = new Date(this.kid.dob);
    let birthYear = moment(birth).format('YYYY');
    let currentYear = moment(Date.now()).format('YYYY');
    console.log('birthYear', birthYear)
    console.log('currentYear', currentYear)
    if (birthYear >= currentYear) {
      this.toastr.warning( 'Please Fill Valid Birth Year!')
    }
    else {
      var ageDifMs = Date.now() - birth.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      var age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if(age>=18 || age<=0){
        this.toastr.warning( "!","please fill valid birth year");
      }else{
      this.kid.age = String(age);
      this.kid.relationToChild = 'father'
      this.kid.sex = 'male'
      console.log('kidd data', this.kid)
     this.nextStep()
      }
  }
}

  addChild(){
    this.kid.interestInfo = this.selectedTags
    this.kid.parentId= this.parent.id
    console.log('birthYear', this.parent.id)
      this.ngxLoader.start();
      console.log('childData before', this.kid)
      this.apiservice.addChild(this.kid).subscribe((res: any) => {
        this.ngxLoader.stop();
        console.log('childData after', res)
        // if(res.isSuccess===true){
        // }
      });
      this.ngxLoader.stop();
    }





  // ------------------------------------------auto-complete search functionality for tags-------------------
  selectEvent(item) {
    if(this.step4===true || this.step3===true){
      const index: number = this.selectedTags.indexOf(item);
      if (this.selectedTags.indexOf(item) === -1 && this.interests.length<=4) {
        this.selectedTags.push(item);
        item.active = !item.active;
      }
      else if (index !== -1) {
        item.active = !item.active;
        this.selectedTags.splice(index, 1);
      }
      console.log('selected tags', this.selectedTags)
    }
  }

  onChangeSearch(key: string) {
    if(this.step4===true || this.step3===true){
    if(key.length>2){
      this.ngxLoader.start();
      this.apiservice.searchTag(key).subscribe((res: any) => {
        this.searchTags = res;
        this.ngxLoader.stop()
      });
    }


  }
  }


   // ------------------------------------------get categories-----------------------------------------------------------------
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      console.log('catg list', this.categories)
    });
  }

   // ------------------------------------------get tags-----------------------------------------------------------------
  getTagList() {
    this.apiservice.getTag().subscribe((res: any) => {
      this.tags = res.data;
      console.log('catg list', this.tags)
    });
  }

 // ------------------------------------------select tags---------------------------------------------------
  selectSkills(t) {
    if(this.step4===true ||this.step3===true ){
      const index: number = this.selectedTags.indexOf(t);
      if (this.selectedTags.indexOf(t) === -1 && this.interests.length<=4) {
        this.selectedTags.push(t);
        t.active = !t.active;
      }
      else if (index !== -1) {
        this.selectedTags.splice(index, 1);
        t.active = !t.active;
      }
      console.log('selected tags', this.selectedTags)
    }
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Structured and well-planned onboarding process for parents to explore kids program, fun activities, and online classes. Visit Wondrfly's website for more info." }
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'kids on boarding,onboarding'}
    );

    window.scroll(0, 0);
    this.getCategoryList();
    this.getTagList();
    this.locationForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),

    });

    this.addChildForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      fromWhereYouHeard: new FormControl('', [Validators.required]),
    });
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
          this.parent.lat = String(place.geometry.location.lat());
          this.parent.lng = String(place.geometry.location.lng());
        });
      });
    });


  }

  nextStep() {
    window.scroll(0, 0);
    if (this.step1) {
      this.step1= false;
      this.step2 = true;
      this.progressBarVaue += 25;

    }
    else if (this.step2) {
      this.step3 = true;
      this.step2 = false;
      this.progressBarVaue += 28;
    }
    else if (this.step3) {
      this.step4 = true;
      this.step3 = false;
      this.progressBarVaue += 25;
    }
    else if (this.step4) {
      this.step5 = true;
      this.step4 = false;
      this.progressBarVaue += 25;
    }
}
backStep() {
  window.scroll(0, 0);
  if (this.step2) {
    this.step1 = true;
    this.step2 = false;
    this.progressBarVaue -= 25;
  }
  else if (this.step3) {
    this.step2 = true;
    this.step3 = false;
    this.progressBarVaue -= 28;
  }
  else if (this.step4) {
    this.step3 = true;
    this.step4 = false;
    this.progressBarVaue -= 25;
  }
  else if (this.step5) {
    this.step4 = true;
    this.step5 = false;
    this.progressBarVaue -= 25;
  }
}

// -----------------------------------------------update parent----------------------------------
updateParent() {
  this.parent.addressLine1 = this.locationForm.value.addressLine1;
  this.parent.location = this.locationForm.value.location;
  this.ngxLoader.start();
  console.log('before parent update', this.parent)
  this.apiservice.updateParent(this.parent.id, this.parent).subscribe((res: any) => {
    this.ngxLoader.stop();
    console.log('after parent update', res)
    if(res.isSuccess===true){
      this.router.navigate(['parent/my-wondrfly'])
    }
  });
}
  }

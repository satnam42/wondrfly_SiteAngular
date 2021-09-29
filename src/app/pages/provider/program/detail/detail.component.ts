import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Program, User, Category } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AuthsService } from 'src/app/core/services/auths.service';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Title, Meta } from '@angular/platform-browser';
import { Globals } from 'src/app/core/common/imageLoader';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/guitar.png';
  baseUrl= environment.baseUrl;
  programUpdateForm: FormGroup;
  pageNo = 1;
  pageSize = 20;
  isScrol: boolean = true;
  programs:any = new Program;
  categories: any = new Category;
  program = new Program;
  lat = 51.678418;
  lng = 7.809007;
  title: string = ''
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + ' YRS';
    }
  };

  isLogin = false;
  providerRole: boolean = false;
  updateProgramResponse: any;
  batchData: any;

  isPricePerParticipant = false;
  fileData: File = null;
  imagePath;
  msg: string;
  rating: any;
  // badgesList: any = [];
  // badges: any = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  keyword = 'name';
  separatorKeysCodes: number[] = [ENTER, COMMA];

  fruitCtrl = new FormControl();

  filteredFruits: Observable<any[]>;
  filteredValues: Observable<any[]>;
  getTagResponse: any;

  tags: any = [];
  @ViewChild('fruitInput', { static: true }) fruitInput: ElementRef;

  message: string = ' Claim Requested Done!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  programImgURL: any;
  userLogo: any;
  getUrl: any;
  user: User;
  userId = ''
  fromTime = new Date;
  toTime = new Date;
  toDate = new Date;
 fromDate = new Date;
  markerUrl = 'assets/location.svg'
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  @ViewChild('search1', { static: true })
  public search1: ElementRef;

  program_mins: any;
  //  ng5slider start age group

  minAge: number ;
  maxAge: number;

  ageOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + ' YRS';
    }

  };
  previous;
  totalRating:any = '';
  isRating = false;
  selectedProgram:any;
  constructor(private apiservice: ApiService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthsService,
    public imageLoader: Globals,
    private dataService: DataService) {
    this.activatedRoute.params.subscribe(params => {
      this.program.id = params['id'];
      return this.getProgramById()
    });
    this.user = JSON.parse(localStorage.getItem('userData'));
    if (this.user) {
      this.userId = this.user.id
      this.isLogin = true;
      if (this.user.role === "provider") {
        this.providerRole = true;
      }
      else if (this.user.role === "parent") {
        this.providerRole = false;
      }
    }
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.latitude = +pos.coords.longitude;
        this.longitude = +pos.coords.latitude;
      });
    }
  }

  onChange(data) {
    this.program.duration = moment.utc(moment(this.toTime, "HH:mm:ss").diff(moment(this.fromTime, "HH:mm:ss"))).format("mm");
   }


  openModal(data, batch: any) {
    this.batchData = batch;
  }

  remove(indx): void {
    this.program.tags.splice(indx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.program.tags.push(event.option.value);

  }

  searchTag(key) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
    });

  }

  selectEvent(item) {
    this.program.categoryId=item;
    // do something with selected item
  }
  goToProfile() {
    this.program.programOwner = this.program.programOwner.toLowerCase();
    this.program.programOwner = this.program.programOwner.replace(/ /g,"-");
    this.program.programOwner = this.program.programOwner.replace(/\?/g,"-");
      this.router.navigate(['/provider/program-provider', this.program.programOwner, this.program.user]);
  }
  onChangeSearch(val: string) {
    this.searchTag(val)
  }
  onFocused(e) {
    // do something when input is focused
  }


  // -----------------------------------drag and drop image--------------------------------------------

  onImageDrop = (event) => {
    // this.UploadImage(event)
  }





// ----------------------------------------------------------------------------------------------------------


  getProviderById() {
    this.apiservice.getUserById(this.program.user).subscribe((res: any) => {
      this.user = res.data;
      console.log('userrrrrrrrrr', this.user)
    });
    this.getRating()
  }

    // ---------------------------------navigate to program detail page -------------------------------------------
getRating(){
  this.apiservice.getUserRating(this.program.user).subscribe((res:any) => {
     this.rating = res
     this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
     console.log('ratinggggggggggggg', res)
   });
 }

  getProgramById() {
    this.ngxLoader.start();
    this.apiservice.getProgramById(this.program.id).subscribe(res => {
      this.ngxLoader.stop();
      this.program = res
      console.log('res program by id',this.program)
      this.title = this.program.name
    console.log('catogsdsadasa', this.program)
    this.titleService.setTitle(this.title+ ' - wondrfly');
    this.metaTagService.updateTag(
      { name: 'description', content: this.program.description }
    );
      this.programImgURL = this.program.programCoverPic;
      // this.userLogo = this.program.provider.logo
      this.getProviderProgram();
      this.getProviderById()
      this.program_mins = moment.utc(moment(this.program.time.to, "HH:mm:ss").diff(moment(this.program.time.from, "HH:mm:ss"))).format("mm")
    });

    this.ngxLoader.stop();
  }
// --------------------------------map view popup -----------------------------------------
  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

 mapClicked(e){
  this.clickedMarker(e)
 }
  // claimBusiness() {
  //   if (this.user && this.user.role === 'provider') {
  //     this.claim.requestBy = this.user.id;
  //     this.claim.requestOn = this.program.user;
  //     this.ngxLoader.start();
  //     this.apiservice.claimRequest(this.claim).subscribe(res => {
  //       this.toastyService.info({ title: 'Info', msg: this.message })
  //       this.ngxLoader.stop();

  //     }); this.ngxLoader.stop();

  //   } else {
  //     if (this.user && this.user.role === 'parent') {
  //       this.ngxLoader.start();
  //       let msg = 'please  register or login as provider to claim this business!';
  //       this.toastyService.info({ title: 'Info', msg: msg })
  //       this.ngxLoader.stop();

  //     } else {
  //       this.ngxLoader.start();
  //       let msg = 'please login to claim this business and try again!'
  //       this.toastyService.info({ title: 'Info', msg: msg })
  //       this.ngxLoader.stop();
  //     }
  //   }

  // }

  addAction(programId) {
    let body = {
      action: "view",
      programId: programId
    }
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

  getProviderProgram = async () => {
    await this.apiservice.getProgramByProvider(this.program.user, this.pageNo, this.pageSize).subscribe((res) => {
      this.isScrol = true;
      this.programs = res
      console.log('provider program', this.programs);
    });
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }
  ngOnInit() {
    // this.getBadges();
    this.getCategoryList();

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.program.location = place.formatted_address;
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude
          this.program.lat = place.geometry.location.lat();
          this.program.lng = place.geometry.location.lng();
        });
      });
    });

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 4;

        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

 enableScrolling(){
    window.onscroll=function(){};
}

clickedProgram(data){
  window.scroll(0,0);
  console.log('clickedProgram', data)
  this.program.id= data._id
  this.getProgramById()
  this.program_mins = moment.utc(moment(this.program.time.to, "HH:mm:ss").diff(moment(this.program.time.from, "HH:mm:ss"))).format("mm")
}

addFav() {
  this.program.isFav = true;
  var fav: any = {
    userId: '',
    programId: '',
  };
  fav.userId = this.userId;
  fav.programId = this.program._id;
  this.apiservice.addFavProgram(fav).subscribe(res => {
  });
}

deleteFav() {
  this.program.isFav = false;
  this.apiservice.deleteFavProgram(this.program._id).subscribe(res => {
  });
}
setSubCategoryId(e) {
  let   filterData: any = {
    subcatId: e,
  }
  this.dataService.setOption(filterData)
  this.router.navigate(['/search'])

}
}

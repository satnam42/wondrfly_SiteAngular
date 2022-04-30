import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Program, Category } from 'src/app/core/models';
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
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { createEvent, download } from './event-download.utils';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/favicon.svg';
  baseUrl = environment.baseUrl;
  programUpdateForm: FormGroup;
  pageNo = 1;
  pageSize = 200;
  isScrol: boolean = true;
  programs: any = Program;
  categories: any = new Category;
  program = new Program;
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
  categoryArr: any = [];
  subcatArr: any = [];

  tags: any = [];
  @ViewChild('fruitInput', { static: true }) fruitInput: ElementRef;

  message: string = ' Claim Requested Done!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  programImgURL: any;
  userLogo: any;
  getUrl: any;
  user: any;
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

  minAge: number;
  maxAge: number;

  ageOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + ' YRS';
    }

  };
  previous;
  totalRating: any = '';
  isRating = false;
  selectedProgram: any;
  bannerIndx: number = 0;
  bannerImages = ['assets/General_pattern_activities.png',
    'assets/General_pattern_activities.png',
    'assets/General_pattern_activities.png',
  ]
  optionslotti: AnimationOptions = {
    path: '/assets/wLoader.json',
  };
  events=[]
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
    public globalFunc: Globals,
    private dataService: DataService) {
    this.activatedRoute.params.subscribe(params => {
      this.program.id = params['id'];
      return this.getProgramById()
    });
    this.user = JSON.parse(localStorage.getItem('CurrentUserWondrfly'));
    if (this.user) {
      this.isLogin = true;
      if (this.user.role === "provider") {
        this.providerRole = true;
      }
      else if (this.user.role === "parent") {
        this.userId = this.user.id
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

  animationCreated(animationItem: AnimationItem): void {
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
    this.program.categoryId = item;
    // do something with selected item
  }
  goToProfile(scrollToActivities?) {
    if (scrollToActivities==='activities') {
      this.dataService.setScrollToActivities(scrollToActivities)
    }
    this.program.programOwner = this.program.programOwner.toLowerCase();
    this.program.programOwner = this.program.programOwner.replace(/ /g, "-");
    this.program.programOwner = this.program.programOwner.replace(/\?/g, "-");
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
    });
    this.getRating()
  }

  // ---------------------------------navigate to program detail page -------------------------------------------
  getRating() {
    this.apiservice.getUserRating(this.program.user).subscribe((res: any) => {
      this.rating = res
      this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
    });
  }

  getProgramById() {
    this.events = []
    this.ngxLoader.start();
    this.apiservice.getProgramById(this.program.id).subscribe(res => {
      this.ngxLoader.stop();
      this.program = res
      let event:any = {
        start: new Date(this.program.date.from),
        // end: new Date('2020-01-01')
        end: new Date(this.program.date.to),
        summary: this.program.name,
        description: this.program.description,
        location: this.program.location,
        url: 'https://www.wondrfly.com'
      }

      event.start.setHours(Math.trunc( this.program.time.from ))
      event.start.setMinutes(this.globalFunc.getHourOrMinute(this.program.time.from.toFixed(2).toString(),".",":" ))
      event.end.setHours(Math.trunc( this.program.time.to ))
      event.end.setMinutes(this.globalFunc.getHourOrMinute(this.program.time.to.toFixed(2).toString(),".",":" ))
      this.events.push(event)
      // this.program.time.from =moment(this.program.time.from).format("h:mm");
      // this.program.time.to = moment(this.program.time.to).format("h:mm");
      // this.program.time.from =this.convertNumToTime(this.program.time.from.toFixed(2))
      // this.program.time.to =this.convertNumToTime(this.program.time.to.toFixed(2))
      var lastIndex = this.program.location.lastIndexOf(", ");
      this.program.location = this.program.location.substring(0, lastIndex);
      this.title = this.program.name
      this.categoryArr = this.program.category;
      this.subcatArr = this.program.subCategoryIds
      this.titleService.setTitle(this.title + ' - wondrfly');
      this.metaTagService.updateTag(
        { name: 'description', content: this.program.description }
      );
      this.programImgURL = this.program.programCoverPic;
      // this.userLogo = this.program.provider.logo
      this.getProviderProgram();
      this.getProviderById()
      this.program_mins = moment.utc(moment(this.program.time.to, "HH:mm:ss").diff(moment(this.program.time.from, "HH:mm:ss"))).format("mm")
      this.parentAnalyticAction()
    });

    // this.ngxLoader.stop();
  }

  convertNumToTime(number) {
    // Check sign of given number
    var sign: any = (number >= 0) ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';

    // Add padding if need
    if (minute.length < 2) {
      minute = '0' + minute;
    }

    // // Add Sign in final result
    // sign = sign == 1 ? '' : '-';

    // Concate hours and minutes
    return sign + hour + ':' + minute;
  }

  // --------------------------------map view popup -----------------------------------------
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  mapClicked(e) {
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
      let programs = []
      this.programs.forEach(program => {
        // program.time.from =this.convertNumToTime(program.time.from.toFixed(2))
        // program.time.to =this.convertNumToTime(program.time.to.toFixed(2))
        programs.push(program)
      });
      this.programs = programs
    });
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }
  parentAnalyticAction(){
    this.apiservice.parentAnalytics('program',this.userId,this.program._id).subscribe((res: any) => {
    });
  }
  ngOnInit() {
    window.scroll(0,0)
    this.bannerIndx = Math.floor(Math.random() * this.bannerImages.length);
    // this.getBadges();
    this.getCategoryList();

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete: any = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
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
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 4;

  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
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


  disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
  }

  enableScrolling() {
    window.onscroll = function () { };
  }

  clickedProgram(data) {
    window.scroll(0, 0);
    this.program.id = data._id
    this.getProgramById()
    // this.program_mins = moment.utc(moment(this.program.time.to, "HH:mm:ss").diff(moment(this.program.time.from, "HH:mm:ss"))).format("mm")
  }

  addFav(programId?,indx?) {
    var fav: any = {
      userId: '',
      programId: '',
    };
    if(programId){
      this.programs[indx].isFav = true;
      fav.userId = this.userId;
      fav.programId = this.programs[indx]._id;
    }
    else{
      this.program.isFav = true;
      fav.userId = this.userId;
      fav.programId = this.program._id;
    }
    this.apiservice.addFavProgram(fav).subscribe(res => {
    });
  }

  deleteFav(programId?,indx?) {
    let id = ''
    if(programId){
      id = programId
      this.programs[indx].isFav = false;
    }
else{
  id = this.program._id
  this.program.isFav = false;
}    this.apiservice.deleteFavProgram(id).subscribe(res => {
    });
  }
  setSubCategoryId(tag) {
    let filterData: any = {
      subcatId: tag._id,
      searchedCategoryKey: tag.name
    }
    this.dataService.setOption(filterData)
    this.router.navigate(['/search'])

  }
  centerChange(e) {
  }
//  event download
    download() {
      let content = createEvent(this.events)
      this.events[0].summary = this.events[0].summary.replace(/ /g, "-");
      this.events[0].summary = this.events[0].summary.toLowerCase()
      download(`${this.events[0].summary.slice(0,5)+'-wondrfly'}.ics`, content)
    }
  
}

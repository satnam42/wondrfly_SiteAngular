import { Component, OnInit, ViewChild, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Program, Category, User } from 'src/app/core/models';
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
import { MapTheme } from 'src/app/core/common/map-theme';
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
  fromDate: any;
  toDate: any;
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

  minAge: number = 0;
  maxAge: number = 5;
  ageOption: Options = {
    floor: 0,
    ceil: 15,
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

  currentYear = new Date().getFullYear()
  isDateFilter: boolean = false;
  isTimeFilter: boolean = false;
  isDaysFilter: boolean = false;
  isAgeFilter: boolean = false;
  isTopFilter: boolean = false;
  isPriceFilter: boolean = false;
  isTypeFilter: boolean = false;
  isCategoryFilter: boolean = false;
  isTopFilterCheckBox: boolean = false;
  isMapFilter:boolean = false;
  isAlert: boolean = true;
  isFav: boolean = false;
  categoryId: any = ''
  activityName: any = ''
  filterData: any = {};
  locationData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  isLoaded = false
  categoriesBySearch: any = new Category;
  isActive: boolean = false
  providersBySearch: any = new User;
  userData: any = {};
  providerProgram: any = [];
  isInfiniteScrollDisabled: boolean
  key: string = '';
  parentRole: boolean = false;
  favProgramRes: any;
  searchKey = '';
  fav: any = {
    userId: '',
    programId: '',
  };
  timeSession = ''
  typeChecked = ''
  dateRange: any = {};
  minPrice: any = 50;
  maxPrice: any = 300;
  favourites: any = [];
  facebookActive = ''
  messengerActive = ''
  emailActive = ''
  whatsappActive = ''
  copylinkActive = ''
  priceOption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return '$' + value;
    }
  };
  // ng5slider end
  showReset = false;
  deleteProgramRes: any;
  // latitude: number = 40.5682945; longitude: number = -74.0409239;
  lat = 40.72652470735903;
  lng = -74.05900394007715;
  isMapMoveChecked: boolean
  coordinates:any = {}
  @ViewChild('search', { static: true })
  shareUrlSocial = environment.baseUrl;
  selectedShareData: any;
  url: string;
  suggested: any = [];
  programOwnerData: any = User
  isOnline: boolean = false;
  isInPerson: boolean = false;
  type1: any
  subCats: any = [];
  filterName = '';
  selectedCat: any;
  selectedSubCategories: any = [];
  catData: Category[];
  isBetaPopUp: boolean = false;
  recentFilters: any = []
  searchedSubCategory = ''
  latt: any;
  lngg: any;
  weakDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thrusday', 'friday', 'saturday']
  programTypes = ['Camps', 'Semesters', 'Drop-ins', 'Other']
  programTimes = ['early-morning', 'morning', 'afternoon', 'late-afternoon', 'evening']
  programTimesShow = ['6am - 9am', '9am - 12pm', '12pm - 3pm', '3pm - 6pm', '6pm - 9pm']
  selectedDays: any = []
  selectedProgramTypes: any = []
  selectedProgramTime: any = []
  contentLoaded = false;
  fakeLoaderData = [1, 2]
  currentUser: any;
  cookiesData: string;
  activitySearched = 0
  activityClicked = 0
  moment = moment;
  minDate: moment.Moment;
  upArrow: boolean = false;
  upArrow2: boolean = false;
  providerr = new User;
  activitiesCount = 0
  tempCategoryId = ''
  tempSearchedSubCategory = ''
  tempSelectedSubCategories = []
  tempSelectedDays: any = []
  tempSelectedProgramTypes: any = []
  tempSelectedProgramTime: any = []



  constructor(private apiservice: ApiService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthsService,
    public globalFunc: Globals,
    private dataService: DataService,
    public mapTheme: MapTheme) {
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
    await this.apiservice.getProgramByProvider(this.program.user, this.pageNo,200).subscribe((res) => {
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
  

    programFilter() {
      this.isLoaded=false;
      this.isTimeFilter = false;
      this.isDaysFilter = false;
      this.isTopFilter = false;
      this.isTypeFilter = false;
      this.isCategoryFilter = false;
      if (this.isTopFilterCheckBox || this.categoryId || this.selectedDays.length || this.selectedProgramTypes.length || this.selectedSubCategories.length || this.selectedProgramTime.length || this.isOnline || this.isInPerson || this.isDateFilter || this.isPriceFilter || this.isAgeFilter) {
        let filter = ``
        let inpersonOrVirtual = ''
        let days = ''
        let categoryId = ''
        let tags = ''
        let types = ''
        let times = ''
        let daysCount = 1
        let typesCount = 1
        let tagsCount = 1
        let timesCount = 1
        let ratingFrom = 4
        let ratingTo = 5
        if (this.categoryId) {
          this.isCategoryFilter = true;
          categoryId = this.categoryId
        }
        for (let day of this.selectedDays) {
          this.isDaysFilter = true;
          if (daysCount === 1) {
            days += day
            daysCount++
          }
          else {
            days += ',' + day
          }
        }
        for (let type of this.selectedProgramTypes) {
          if(type=='Drop-ins'){
            type='Drops-in'
          }
          this.isTypeFilter = true
          if (typesCount === 1) {
            types += type
            typesCount++
          }
          else {
            types += ',' + type
          }
        }
        for (let tag of this.selectedSubCategories) {
          this.isCategoryFilter = true
          if (tagsCount === 1) {
            tags += tag
            tagsCount++
          }
          else {
            tags += ',' + tag
          }
        }
        for (let time of this.selectedProgramTime) {
          this.isTimeFilter = true
          if (timesCount === 1) {
            times += time
            timesCount++
          }
          else {
            times += ',' + time
          }
        }
        if (!categoryId && !this.selectedSubCategories.length) {
          this.searchedSubCategory = '';
        }
        if (this.isOnline) {
          inpersonOrVirtual = 'online'
        }
        else if (this.isInPerson) {
          inpersonOrVirtual = 'inperson'
        }
        else {
          inpersonOrVirtual = ''
        }
        const dateFormat = "YYYY-MM-DD";
        this.fromDate = moment(this.fromDate).format(dateFormat);
        this.toDate = moment(this.toDate).format(dateFormat);
        filter = `providerId=${this.user.id}&time=${times}&categoryId=${categoryId}&tagsIds=${tags}&type=${types}&inpersonOrVirtual=${inpersonOrVirtual}&day=${days}`
        if (this.isTopFilterCheckBox) {
          this.isTopFilter = true;
          filter += `&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}`
        }
        if (this.isDateFilter) {
          filter += `&fromDate=${this.fromDate}&toDate=${this.toDate}`
        }
        if (this.isPriceFilter) {
          filter += `&priceFrom=${this.minPrice}&priceTo=${this.maxPrice}`
        }
        if (this.isAgeFilter) {
          filter += `&ageFrom=${this.minAge}&ageTo=${this.maxAge}`
        }
        this.ngxLoader.start()
  
        this.apiservice.programFilter(filter, 1, 1).subscribe((res: any) => {
          this.showReset = true
          if (res.isSuccess && res.data.length) {
            this.programs = res.data[0].programs;
            this.isLoaded=true;
          }
          else{
            this.programs = [];
            this.isLoaded=true;
          }
        });
        this.ngxLoader.stop()
      } else {
        this.pageNo = 1
        this.isTopFilterCheckBox = false
        // this.getProviderProgram();
        this.showReset = false
         this.apiservice.getProgramByProvider(this.user.id, this.pageNo, 200).subscribe((res) => {
          this.programs = res  
          this.isLoaded=true;
      });
      this.ngxLoader.stop()
      }
    }
  
  

    onDayChange(indx: number, day: string, isChecked: boolean) {
      if (isChecked) {
        this.tempSelectedDays.push(day)
      } else {
        this.tempSelectedDays.splice(day, -1)
        let el = this.tempSelectedDays.find(itm => itm === day);
        if (el) this.tempSelectedDays.splice(this.tempSelectedDays.indexOf(el), 1);
      }
    }
    onProgramTypeChange(indx: number, type: string, isChecked: boolean) {
      if (isChecked) {
        this.tempSelectedProgramTypes.push(type)
      } else {
        this.tempSelectedProgramTypes.splice(type, -1)
        let el = this.tempSelectedProgramTypes.find(itm => itm === type);
        if (el) this.tempSelectedProgramTypes.splice(this.tempSelectedProgramTypes.indexOf(el), 1);
      }
    }
    onProgramTimeChange(indx: number, time: string, isChecked: boolean) {
      if (isChecked) {
        this.tempSelectedProgramTime.push(time)
      } else {
        this.tempSelectedProgramTime.splice(time, -1)
        let el = this.tempSelectedProgramTime.find(itm => itm === time);
        if (el) this.tempSelectedProgramTime.splice(this.tempSelectedProgramTime.indexOf(el), 1);
      }
    }
    onProgramsSubCategoryChange(i, event) {
      this.tempCategoryId = ''
      this.subCats[i].checked = event.target.checked;
      if (this.subCats[i].checked) {
        this.tempSearchedSubCategory = this.subCats[i].name;
        this.tempSelectedSubCategories.push(this.subCats[i]._id);
      }
      else {
        const index = this.tempSelectedSubCategories.indexOf(this.subCats[i]._id);
        if (index >= 0) {
          this.tempSelectedSubCategories.splice(index, 1);
        }
      }
    }
  
  
  
    @ViewChildren("types") types: QueryList<ElementRef>;
    clearProgramTypes() {
      this.selectedProgramTypes = []
      this.tempSelectedProgramTypes = []
      this.types.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.programFilter()
    }
  
    @ViewChildren("days") days: QueryList<ElementRef>;
    clearProgramDays() {
      this.selectedDays = []
      this.tempSelectedDays = []
      this.days.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.programFilter()
    }
    @ViewChildren("times") times: QueryList<ElementRef>;
    clearProgramTime() {
      this.selectedProgramTime = []
      this.tempSelectedProgramTime = []
      this.times.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.programFilter()
    }
    choosedDate(e) {
      this.fromDate = e.startDate._d
      this.toDate = e.endDate._d
    }
  
  
   // ---------------------------------------------get categories-------------------------------------
   getCategory() {
    let removedCategory;
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      const idToRemove = '60b47687bb70a952280bfa7b';
      removedCategory = this.categories.filter((item) => item.id === idToRemove);
      this.categories = this.categories.filter((item) => item.id !== idToRemove);
      this.categories.push(removedCategory[0])
      this.categories = this.categories.filter((item) => item.isActivated !== false);
      this.catData = this.categories
    });
  }
  
  
      // ---------------------------------------------get subCateById-------------------------------------
      getSubCateById(cat) {
        this.tempCategoryId = cat.id
        this.selectedCat = cat.id
        this.tempSelectedSubCategories = []
        this.tempSearchedSubCategory = cat.name
        this.apiservice.getTagByCategoryId(cat.id).subscribe((res: any) => {
          this.subCats = res.data
          this.subCats = this.subCats.filter((item) => item.isActivated === true && item.programCount);
        })
      }
      resetFilter() {
        this.searchedSubCategory = '';
        this.activityName = '';
        this.isInPerson = false;
        this.showReset = false;
        this.isTypeFilter = false;
        this.categoryId = '';
        this.isOnline = false;
        this.isDaysFilter = false
        this.isTimeFilter = false;
        this.isTopFilterCheckBox = false
        this.isTopFilter = false;
        this.isAgeFilter = false;
        this.isDateFilter = false;
        this.selectedSubCategories = [];
        this.isPriceFilter = false;
        this.isCategoryFilter = false;
        this.maxAge = 5;
        this.minAge = 0;
        this.pageNo = 1;
        this.pageSize = 20;
        this.selectedProgramTime = []
        this.programs = []
        this.times.forEach((element) => {
          element.nativeElement.checked = false;
        });
        this.selectedDays = []
        this.days.forEach((element) => {
          element.nativeElement.checked = false;
        });
        this.selectedProgramTypes = []
        this.types.forEach((element) => {
          element.nativeElement.checked = false;
        });
        this.selectedCat = '';
        this.categoryId = '';
        this.subCats = [];
        this.selectedSubCategories = []
        // this.scrollToActivities ='activities'
        this.ngxLoader.start()
        this.showReset = false
        this.isLoaded=false;
         this.apiservice.getProgramByProvider(this.user.id, this.pageNo, 200).subscribe((res) => {
          this.programs = res
          this.isLoaded=true;
      });  
      this.ngxLoader.stop()
    }
    removeRecentSearches(type, indx) {
      switch (type) {
        case 'days': {
          this.days.forEach((element) => {
            if (element.nativeElement.defaultValue === this.selectedDays[indx]) {
              this.selectedDays.splice(indx, 1);
              element.nativeElement.checked = false;
            }
          });
        }
        case 'times': {
          this.times.forEach((element) => {
            if (element.nativeElement.value === this.selectedProgramTime[indx]) {
              this.selectedProgramTime.splice(indx, 1);
              element.nativeElement.checked = false;
            }
          });
        }
        case 'types': {
          this.types.forEach((element) => {
            if (element.nativeElement.value === this.selectedProgramTypes[indx]) {
              this.selectedProgramTypes.splice(indx, 1);
              element.nativeElement.checked = false;
            }
          });
        }
      }
      this.programFilter();
    }
    
}

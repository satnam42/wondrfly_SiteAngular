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
  events = []

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
  isMapFilter: boolean = false;
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
  filterObj: any = {}
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
  coordinates: any = {}
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
  // tempCategoryId = ''
  // tempSearchedSubCategory = ''
  // tempSelectedSubCategories = []
  // tempSelectedDays: any = []
  // tempSelectedProgramTypes: any = []
  // tempSelectedProgramTime: any = []



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
    if (scrollToActivities === 'activities') {
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
      this.checkQueryParams()
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
      // let event: any = {
      //   start: new Date(this.program.date.from),
      //   // end: new Date('2020-01-01')
      //   end: new Date(this.program.date.to),
      //   summary: this.program.name,
      //   description: this.program.description,
      //   location: this.program.location,
      //   url: 'https://www.wondrfly.com'
      // }

      // event.start.setHours(Math.trunc(this.program.time.from))
      // event.start.setMinutes(this.globalFunc.getHourOrMinute(this.program.time.from.toFixed(2).toString(), ".", ":"))
      // event.end.setHours(Math.trunc(this.program.time.to))
      // event.end.setMinutes(this.globalFunc.getHourOrMinute(this.program.time.to.toFixed(2).toString(), ".", ":"))
      // this.events.push(event)
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
      this.getProviderById()
      // this.program_mins = moment.utc(moment(this.program.time.to, "HH:mm:ss").diff(moment(this.program.time.from, "HH:mm:ss"))).format("mm")
      this.parentAnalyticAction()
    });

    // this.ngxLoader.stop();
  }
  checkQueryParams() {
    this.activatedRoute.params.subscribe(params => {
      params['filter'];
      if (params.filter && params.filter !== 'filter') {
        this.filterObj = JSON.parse('{"' + params.filter.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        if (this.filterObj.hasOwnProperty('categoryId')) {
          this.checkCategoryFilter(this.filterObj.categoryId, 'category')
          this.isCategoryFilter = true;
          this.categoryId = this.filterObj.categoryId;
        }
        if (this.filterObj.hasOwnProperty('tagsIds')) {
          this.isCategoryFilter = true;
          let ids = this.filterObj.tagsIds.split(',');
          this.selectedSubCategories = ids;
          this.checkCategoryFilter(this.selectedSubCategories[0], 'subcategory')
        }

        if (this.filterObj.hasOwnProperty('day')) {
          this.isDaysFilter = true;
          let days = this.filterObj.day.split(',');
          this.selectedDays = days;
        }
        if (this.filterObj.hasOwnProperty('time')) {
          this.isTimeFilter = true;
          let time = this.filterObj.time.split(',');
          this.selectedProgramTime = time
        }
        if (this.filterObj.hasOwnProperty('type')) {
          this.isTypeFilter = true;
          let type = this.filterObj.type.split(',');
          var index = type.indexOf('Drops-in');
          if (~index) {
            type[index] = 'Drop-ins';
          }
          this.selectedProgramTypes = type
        }
        if (this.filterObj.hasOwnProperty('ratingFrom') && this.filterObj.hasOwnProperty('ratingTo')) {
          delete this.filterObj['ratingFrom']
          delete this.filterObj['ratingTo']
        }
        if (this.filterObj.hasOwnProperty('inpersonOrVirtual')) {
          if (this.filterObj.inpersonOrVirtual == 'online') {
            this.isOnline = true
          }
          else if (this.filterObj.inpersonOrVirtual == 'inperson') {
            this.isInPerson = true
          }
        }
        if (this.filterObj.hasOwnProperty('fromDate') && this.filterObj.hasOwnProperty('toDate')) {
          this.isDateFilter = true
          this.fromDate = this.filterObj.fromDate
          this.toDate = this.filterObj.toDate
        }

        if (this.filterObj.hasOwnProperty('ageFrom') && this.filterObj.hasOwnProperty('ageTo')) {
          this.isAgeFilter = true
          this.minAge = +this.filterObj.ageFrom
          this.maxAge = +this.filterObj.ageTo
        }
        if (this.filterObj.hasOwnProperty('priceFrom') && this.filterObj.hasOwnProperty('priceTo')) {
          this.isPriceFilter = true
          this.minPrice = +this.filterObj.priceFrom
          this.maxPrice = +this.filterObj.priceTo
        }
        if (this.filterObj.hasOwnProperty('lat') && this.filterObj.hasOwnProperty('lng')) {
          this.isMapFilter = false
          delete this.filterObj['lat']
          delete this.filterObj['lat']
        }
        this.programFilter(params.filter)
      }
      else {
        this.router.navigate(
          [],
          { relativeTo: this.activatedRoute, queryParams: {} }
        );
        this.getProviderProgram()
      }
    });

  }

  checkCategoryFilter(id, type) {
    if (type === 'category') {
      this.apiservice.getCategory().subscribe((res: any) => {
        let index = res.findIndex(object => {
          return object.id === id;
        });
        if (~index) {
          this.searchedSubCategory = res[index].name
        }
      });
    }
    if (type === 'subcategory') {
      this.apiservice.getTag().subscribe((res: any) => {
        console.log('res', res)
        let index = res.data.findIndex(object => {
          return object._id === id;
        });
        if (~index) {
          this.searchedSubCategory = res.data[index].name
        }
        console.log('searchedSubCategory', this.searchedSubCategory)
        console.log('res', res)
        console.log('id', id)
      });
    }

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
    await this.apiservice.getProgramByProvider(this.program.user, this.pageNo, 200).subscribe((res) => {
      this.isScrol = true;
      this.showReset = false
      this.providerProgram.programs = res
    });
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }
  parentAnalyticAction() {
    this.apiservice.parentAnalytics('program', this.userId, this.program._id).subscribe((res: any) => {
    });
  }
  ngOnInit() {
    window.scroll(0, 0)
    this.activatedRoute.params.subscribe(params => {
      this.program.id = params['id'];
      return this.getProgramById()
    });
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

  addFav(programId?, indx?) {
    var fav: any = {
      userId: '',
      programId: '',
    };
    if (programId) {
      this.program.isFav = true;
      fav.userId = this.userId;
      fav.programId = this.program._id;
    }
    else {
      this.program.isFav = true;
      fav.userId = this.userId;
      fav.programId = this.program._id;
    }
    this.apiservice.addFavProgram(fav).subscribe(res => {
    });
  }

  deleteFav(programId?, indx?) {
    let id = ''
    if (programId) {
      id = programId
      this.program.isFav = false;
    }
    else {
      id = this.program._id
      this.program.isFav = false;
    } this.apiservice.deleteFavProgram(id).subscribe(res => {
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
    download(`${this.events[0].summary.slice(0, 5) + '-wondrfly'}.ics`, content)
  }

  setFilterQuery(filterType) {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (params.filter) {
          this.filterObj = JSON.parse('{"' + params.filter.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        }
      })
    switch (filterType) {
      case 'category':

        if (this.filterObj.hasOwnProperty('categoryId') && this.categoryId) {
          delete this.filterObj['tagsIds'];
          this.filterObj.categoryId = this.categoryId
        }
        else if (!this.filterObj.hasOwnProperty('categoryId') && this.categoryId) {
          delete this.filterObj['tagsIds'];
          Object.assign(this.filterObj, { categoryId: this.categoryId });
        } else {
          delete this.filterObj['categoryId'];
          if (this.filterObj.hasOwnProperty('tagsIds') && this.selectedSubCategories.length) {
            this.filterObj.tagsIds = this.selectedSubCategories.toString();
          }
          else if (!this.filterObj.hasOwnProperty('tagsIds') && this.selectedSubCategories.length) {
            Object.assign(this.filterObj, { tagsIds: this.selectedSubCategories.toString() });
          }
          else {
            delete this.filterObj['tagsIds'];
          }
        }
        break;
      case 'day':

        if (this.filterObj.hasOwnProperty('day') && this.selectedDays.length) {
          this.filterObj.day = this.selectedDays.toString();
        }
        else if (!this.filterObj.hasOwnProperty('day') && this.selectedDays.length) {
          Object.assign(this.filterObj, { day: this.selectedDays.toString() });
        }
        else {
          this.isDaysFilter = false;
          delete this.filterObj['day'];
        }
        break;

      case 'time':

        if (this.filterObj.hasOwnProperty('time') && this.selectedProgramTime.length) {
          this.filterObj.day = this.selectedDays.toString();
        }
        else if (!this.filterObj.hasOwnProperty('time') && this.selectedProgramTime.length) {
          Object.assign(this.filterObj, { time: this.selectedProgramTime.toString() });
        }
        else {
          this.isTimeFilter = false;
          delete this.filterObj['time'];
        }
        break;

      case 'type':
        let array: any = [];
        array = [...this.selectedProgramTypes]
        var index = array.indexOf('Drop-ins');
        if (~index) {
          array[index] = 'Drops-in';
        }
        if (this.filterObj.hasOwnProperty('type') && array.length) {
          this.filterObj.type = array.toString();
        }
        else if (!this.filterObj.hasOwnProperty('type') && array.length) {
          Object.assign(this.filterObj, { type: array.toString() });
        }
        else {
          this.isTypeFilter = false;
          delete this.filterObj['type'];
        }
        break;
      case 'online':

        if (this.filterObj.hasOwnProperty('inpersonOrVirtual') && this.isOnline) {
          this.filterObj.inpersonOrVirtual = 'online';
        }
        else if (!this.filterObj.hasOwnProperty('inpersonOrVirtual') && this.isOnline) {
          Object.assign(this.filterObj, { inpersonOrVirtual: 'online' });
        } else {
          delete this.filterObj['inpersonOrVirtual']
        }
        break;

      case 'inperson':

        if (this.filterObj.hasOwnProperty('inpersonOrVirtual') && this.isInPerson) {
          this.filterObj.inpersonOrVirtual = 'inperson';
        }
        else if (!this.filterObj.hasOwnProperty('inpersonOrVirtual') && this.isInPerson) {
          Object.assign(this.filterObj, { inpersonOrVirtual: 'inperson' });
        } else {
          delete this.filterObj['inpersonOrVirtual']
        }
        break;

      case 'date':
        const dateFormat = "YYYY-MM-DD";
        this.fromDate = moment(this.fromDate).format(dateFormat);
        this.toDate = moment(this.toDate).format(dateFormat);
        if (this.filterObj.hasOwnProperty('fromDate') && this.filterObj.hasOwnProperty('toDate') && this.isDateFilter && this.toDate.length) {
          console.log(this.toDate)
          this.filterObj.fromDate = this.fromDate;
          this.filterObj.toDate = this.toDate;
        }
        else if (!this.filterObj.hasOwnProperty('fromDate') && !this.filterObj.hasOwnProperty('toDate') && this.isDateFilter && this.toDate.length) {
          Object.assign(this.filterObj, { fromDate: this.fromDate });
          Object.assign(this.filterObj, { toDate: this.toDate });
        } else {
          delete this.filterObj['fromDate']
          delete this.filterObj['toDate']
        }
        break;
      case 'age':

        if (this.filterObj.hasOwnProperty('ageFrom') && this.filterObj.hasOwnProperty('ageTo') && this.isAgeFilter) {
          this.filterObj.ageFrom = this.minAge;
          this.filterObj.ageTo = this.maxAge;
        }
        else if (!this.filterObj.hasOwnProperty('ageFrom') && !this.filterObj.hasOwnProperty('ageTo') && this.isAgeFilter) {
          Object.assign(this.filterObj, { ageFrom: this.minAge });
          Object.assign(this.filterObj, { ageTo: this.maxAge });
        } else {
          delete this.filterObj['ageFrom']
          delete this.filterObj['ageTo']
        }
        break;
      case 'price':
        if (this.filterObj.hasOwnProperty('priceFrom') && this.filterObj.hasOwnProperty('priceTo') && this.isPriceFilter) {
          this.filterObj.fromDate = this.fromDate;
          this.filterObj.toDate = this.toDate;
        }
        else if (!this.filterObj.hasOwnProperty('priceFrom') && !this.filterObj.hasOwnProperty('priceTo') && this.isPriceFilter) {
          Object.assign(this.filterObj, { priceFrom: this.minPrice });
          Object.assign(this.filterObj, { priceTo: this.maxPrice });
        } else {
          delete this.filterObj['priceFrom']
          delete this.filterObj['priceTo']
        }
        break;

    }

    const filter = new URLSearchParams(this.filterObj).toString();
    var programName = this.program.name;
    programName = programName.toLowerCase();
    programName = programName.replace(/ /g, "-");
    programName = programName.replace(/\?/g, "-");
    if (filter) {
      this.router.navigate(['program', programName, this.program._id, filter])
    } else {
      this.router.navigate(['program', programName, this.program._id, 'filter'])
    }
    // this.router.navigate(
    //   [],
    //   {
    //     relativeTo: this.activatedRoute, queryParams: {
    //       filter: filter
    //     }
    //   }
    // );
    // this.router
    // .navigateByUrl("/", { skipLocationChange: true })
    // .then(() => this.router.navigate(['/search'], {
    //   queryParams: {
    //     filter: filter
    //   }
    // }));
  }
  programFilter(filter?) {
    filter += `&providerId=${this.user.id}`
    let checkFilter = JSON.parse('{"' + filter.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
    if (!checkFilter.hasOwnProperty('providerId')) {
      checkFilter.providerId = this.user.id
    }
    delete checkFilter['ratingFrom']
    delete checkFilter['ratingTo']
    delete checkFilter['lng']
    delete checkFilter['lng']
    const filterr = new URLSearchParams(checkFilter).toString();
    this.apiservice.programFilter(filterr, 1, 1).subscribe((res: any) => {
      this.showReset = true
      if (res.isSuccess) {
        this.activitiesCount = res.total
        // this.isTopFilterCheckBox = false
        // res.items = res.items.filter(item => item.user[0].isActivated === true)
        // if (res.items) {
        // }
        // // if (this.isTopFilter) {
        // //   this.providerProgram = this.programs.sort((a, b) => b.user[0]?.averageFinalRating - a.user[0]?.averageFinalRating);
        // // }
        // else {
        //   this.providerProgram = this.programs;
        // }
        this.programs =  res.items
        this.providerProgram.programs = this.programs[0].programs
        // if (!this.providerProgram.length) {
        //   this.isLoaded = true
        // }

        this.isScrol = false;
      }
      this.ngxLoader.stop()
    });
  }



  onDayChange(indx: number, day: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedDays.push(day)
    } else {
      this.selectedDays.splice(day, -1)
      let el = this.selectedDays.find(itm => itm === day);
      if (el) this.selectedDays.splice(this.selectedDays.indexOf(el), 1);
    }
  }
  onProgramTypeChange(indx: number, type: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedProgramTypes.push(type)
    } else {
      this.selectedProgramTypes.splice(type, -1)
      let el = this.selectedProgramTypes.find(itm => itm === type);
      if (el) this.selectedProgramTypes.splice(this.selectedProgramTypes.indexOf(el), 1);
    }
  }
  onProgramTimeChange(indx: number, time: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedProgramTime.push(time)
    } else {
      this.selectedProgramTime.splice(time, -1)
      let el = this.selectedProgramTime.find(itm => itm === time);
      if (el) this.selectedProgramTime.splice(this.selectedProgramTime.indexOf(el), 1);
    }
  }
  onProgramsSubCategoryChange(i, event) {
    this.categoryId = ''
    this.subCats[i].checked = event.target.checked;
    if (this.subCats[i].checked) {
      this.searchedSubCategory = this.subCats[i].name;
      this.selectedSubCategories.push(this.subCats[i]._id);
    }
    else {
      const index = this.selectedSubCategories.indexOf(this.subCats[i]._id);
      if (index >= 0) {
        this.selectedSubCategories.splice(index, 1);
      }
    }
  }



  @ViewChildren("types") types: QueryList<ElementRef>;
  clearProgramTypes() {
    this.selectedProgramTypes = []
    this.types.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.setFilterQuery('type')
  }

  @ViewChildren("days") days: QueryList<ElementRef>;
  clearProgramDays() {
    this.selectedDays = []
    this.days.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.setFilterQuery('day')
  }
  @ViewChildren("times") times: QueryList<ElementRef>;
  clearProgramTime() {
    this.selectedProgramTime = []
    this.times.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.setFilterQuery('time')
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
    this.categoryId = cat.id
    this.selectedCat = cat.id
    this.selectedSubCategories = []
    this.searchedSubCategory = cat.name
    this.apiservice.getTagByCategoryId(cat.id).subscribe((res: any) => {
      this.subCats = res.data
      this.subCats = this.subCats.filter((item) => item.isActivated === true && item.programCount);
    })
  }
  resetFilter(data) {
    var programName = data.name;
    programName = programName.toLowerCase();
    programName = programName.replace(/ /g, "-");
    programName = programName.replace(/\?/g, "-");
    // this.router.navigate(['program', programName, data._id, 'filter'])
    this.router
    .navigateByUrl("/", { skipLocationChange: true })
    .then(() => this.router.navigate(['program', programName, data._id,'filter']));
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
    this.isLoaded = false;
    this.apiservice.getProgramByProvider(this.user.id, this.pageNo, 200).subscribe((res) => {
      this.providerProgram.programs = res      
    });
    this.ngxLoader.stop()
  }
  removeRecentSearches(type, indx) {
    switch (type) {
      case 'days':
        this.days.forEach((element) => {
          if (element.nativeElement.defaultValue === this.selectedDays[indx]) {
            this.selectedDays.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
        this.setFilterQuery('day')
        break;

      case 'times':
        this.times.forEach((element) => {
          if (element.nativeElement.value === this.selectedProgramTime[indx]) {
            this.selectedProgramTime.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
        this.setFilterQuery('time')
        break;
      case 'types':
        this.types.forEach((element) => {
          if (element.nativeElement.value === this.selectedProgramTypes[indx]) {
            this.selectedProgramTypes.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
        this.setFilterQuery('type')
        break;
    }
  }

}

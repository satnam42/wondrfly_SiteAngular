import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Category, User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { JoyrideService } from 'ngx-joyride';
import { AuthsService } from 'src/app/core/services/auths.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globals } from 'src/app/core/common/imageLoader';
import { MapTheme } from 'src/app/core/common/map-theme';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear()
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/favicon.svg';
  isDateFilter: boolean = false;
  isTimeFilter: boolean = false;
  isDaysFilter: boolean = false;
  isAgeFilter: boolean = false;
  isTopFilter: boolean = false;
  isPriceFilter: boolean = false;
  isTypeFilter: boolean = false;
  isCategoryFilter: boolean = false;
  // isTopFilterCheckBox: boolean = false;
  isMapFilter: boolean = false;
  isAlert: boolean = true;
  isFav: boolean = false;
  categoryId: any = ''
  filterObj: any = {}
  activityName: any = ''
  rating: any;
  filterData: any = {};
  locationData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  isLoaded = false
  categories: Category[];
  categoriesBySearch: any = new Category;
  isActive: boolean = false
  providersBySearch: any = new User;
  userData: any = {};
  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 15;
  programs: any = [];
  providerProgram: any = [];
  isInfiniteScrollDisabled: boolean
  isLogin: Boolean = false;
  key: string = '';
  providerRole: boolean = false;
  parentRole: boolean = false;
  favProgramRes: any;
  keyword = 'name';
  searchKey = '';
  isScrol = true;
  fav: any = {
    userId: '',
    programId: '',
  };
  fromDate: any;
  toDate: any;
  fromTime: any;
  timeSession = ''
  typeChecked = ''
  toTime: any;
  dateRange: any = {};
  minPrice: any = 50;
  maxPrice: any = 300;
  favourites: any = [];
  facebookActive = ''
  messengerActive = ''
  emailActive = ''
  whatsappActive = ''
  copylinkActive = ''
  totalRating: any = '';
  isRating: boolean
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
  title = 'Search for Online Classes and Programs - Wondrfly';
  // latitude: number = 40.5682945; longitude: number = -74.0409239;
  lat = 40.72652470735903;
  lng = -74.05900394007715;
  zoom = 15;
  address: string;
  private geoCoder;
  isMapMoveChecked: boolean
  coordinates: any = {}
  user = new User
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  shareUrlSocial = environment.baseUrl;
  baseUrl = environment.baseUrl;
  selectedShareData: any;
  url: string;
  suggested: any = [];
  programOwnerData: any = User
  isOnline: boolean = false;
  isInPerson: boolean = false;
  isRating3_5:boolean = false;
  isRating4_5:boolean = false;
  type1: any
  subCats: any = [];
  previous;
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
  userId = ''
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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private auth: AuthsService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    private ngZone: NgZone,
    private titleService: Title,
    private metaTagService: Meta,
    private cookies: CookieService,
    private joyride: JoyrideService,
    private ngxLoader: NgxUiLoaderService,
    public globalFunc: Globals,
    public mapTheme: MapTheme
  ) {
    this.activityClicked = Number(this.cookies.get('activityClicked'))
    this.activitySearched = Number(this.cookies.get('activitySearched'))
    // let regCount = this.activitySearched + 1
    // this.cookies.set('activitySearched', String(regCount), 30);
    this.countVisit()
    this.minDate = moment();
    // this.locationData = dataservice.getLocation()
    // if(this.locationData){
    //   this.contentLoaded=true;
    //   if (this.locationData.lat && this.locationData.lng) {
    //     this.latt =this.locationData.lat
    //     this.lngg= this.locationData.lng
    //   }
    // }
    // let regCount = this.activitySearched + 1
    // this.cookies.set('activitySearched', String(regCount), 30);
    this.contentLoaded = false
    this.currentUser = auth.currentUser();
    this.filterData = dataservice.getOption()
    // this.exploreModal()
    var retrievedObject = localStorage.getItem('CurrentUserWondrfly');
    this.userData = JSON.parse(retrievedObject);
    // this.selectedProgramTypes.push('Drop-ins')
    // if (this.filterData.subcatId || this.filterData.categoryId || this.filterData.kidAge) {
    //   this.selectedProgramTypes = []
    //    this.categoryId = this.filterData.categoryId
    //   this.searchedSubCategory = this.filterData.searchedCategoryKey
    //   if (this.filterData.subcatId) {
    //     this.selectedSubCategories[0] = this.filterData.subcatId;
    //   }
    //   if (this.filterData.childIntrests) {
    //     for (let intrest of this.filterData.childIntrests) {
    //       this.selectedSubCategories.push(intrest)
    //     }
    //   }
    //   if (this.filterData.kidAge?.length) {


    //     if (this.filterData.kidAge >= 1) {
    //       this.isAgeFilter = true
    //       this.maxAge = Number(this.filterData.kidAge)
    //       this.minAge = 0
    //     }
    //     if (this.filterData.kidAge < 1) {
    //       this.isAgeFilter = true
    //       this.maxAge = 1
    //       this.minAge = 0
    //     }
    //   }
    //   if (this.filterData?.online) {
    //     this.isOnline = true;
    //   }
    //   this.programFilter()
    // }
    // else if (this.selectedProgramTypes.length){
    //   this.programFilter()
    // }
    // else if (this.filterData.activityName) {
    //   this.activityName = this.filterData.activityName
    //   this.filterByNameDate()
    // }
    // else {
    //   this.getPublishedProgram()
    // }
    if (this.userData) {
      this.isLogin = true;
      if (this.userData.role === 'provider') {
        this.providerRole = true;
        this.parentRole = false;
      }
      if (this.userData.role === 'parent') {
        this.userId = this.userData.id
        this.parentRole = true;
        this.providerRole = false;
      }
    }
  }

  startTour() {
    if (this.providerProgram.length && Number(this.cookiesData) <= 1) {
      this.joyride.startTour({ steps: ['firstStep'] });
      this.cookies.set('isTour', '2', 30);
      window.scroll(0, 0);
    }
    // else if (this.providerProgram.length && this.cookiesData == '2' && !this.isOnline) {
    //   this.joyride.startTour({ steps: ['secondStep0'] });
    //   this.cookies.set('isTour', '3', 30);
    // }
    else if (this.cookiesData == '2' && this.providerProgram.length && !this.isOnline) {
      this.joyride.startTour({ steps: ['thirdStep00'] });
      this.cookies.set('isTour', '3', 30);
    }
    else if (this.cookiesData == '3' && !this.isOnline) {
      // window.document.getElementById("exploreModal").click();
      this.cookies.set('isTour', '4', 30);
      window.scroll(0, 0);
    }
    this.cookiesData = this.cookies.get('isTour');
  }

  choosedDate(e) {
    this.fromDate = e.startDate._d
    this.toDate = e.endDate._d
  }

  centerChange(coords: LatLngLiteral) {
    this.coordinates.lat = coords.lat;
    this.coordinates.lng = coords.lng;
  }
  dragEnd(map) {
    map.addListener("dragend", () => {
      if (this.isMapMoveChecked) {
        this.isMapFilter = true
        this.setFilterQuery('map')
      }
    });

  }
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  mapClicked(e) {
    this.clickedMarker(e)
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
      this.searchedSubCategory = this.subCats[i].name;
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
  mailChimpCompleted() {
    window.scrollTo(0, 0)
    this.cookies.set('exploreModal', '5', 30);
  }
  countVisit() {
    window.scrollTo(0, 0)
    this.cookiesData = this.cookies.get('isTour');
    let num = Number(this.cookiesData) + 1
    this.cookies.set('isTour', String(num), 30);
  }
  ngOnInit() {
    window.scrollTo(0, 0)
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (params.filter) {
          this.filterObj = JSON.parse('{"' + params.filter.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
          if (this.filterObj.hasOwnProperty('categoryId')) {
            this.checkCategoryFilter(this.filterObj.categoryId, 'category')
            this.isCategoryFilter = true;
            this.categoryId = this.filterObj.categoryId;
            this.tempCategoryId = this.filterObj.categoryId
          }
          else{
            this.isCategoryFilter = false;
          }
          if (this.filterObj.hasOwnProperty('tagsIds')) {
            this.isCategoryFilter = true;
            let ids = this.filterObj.tagsIds.split(',');
            this.selectedSubCategories = ids;
            this.tempSelectedSubCategories = ids
            this.checkCategoryFilter(this.selectedSubCategories[0], 'subcategory')
          }
          if (this.filterObj.hasOwnProperty('day')) {
            this.isDaysFilter = true;
            let days = this.filterObj.day.split(',');
            this.selectedDays = days;
            this.tempSelectedDays = days
          }
          else{
            this.isDaysFilter=false
          }
          if (this.filterObj.hasOwnProperty('time')) {
            this.isTimeFilter = true;
            let time = this.filterObj.time.split(',');
            this.selectedProgramTime = time
            this.tempSelectedProgramTime = time
          }  else{
            this.isTimeFilter=false
          }
          if (this.filterObj.hasOwnProperty('type')) {
            this.isTypeFilter = true;
            let type = this.filterObj.type.split(',');
            var index = type.indexOf('Drops-in');
            if (~index) {
              type[index] = 'Drop-ins';
            }
            this.selectedProgramTypes = type
            this.tempSelectedProgramTypes - type
          }
          else{
            this.isTypeFilter=false
          }
          if (this.filterObj.hasOwnProperty('ratingFrom') && this.filterObj.hasOwnProperty('ratingTo')) {
         
             if(+this.filterObj.ratingFrom >= 4){
              this.isRating4_5 = true
            }  else if (+this.filterObj.ratingFrom > 0) {
              this.isRating3_5 = true
            }
        
          }
          else{
            this.isRating3_5=false;
            this.isRating4_5 = false
          }
          if (this.filterObj.hasOwnProperty('inpersonOrVirtual')) {
            if (this.filterObj.inpersonOrVirtual == 'online') {
              this.isOnline = true
            }
            else if (this.filterObj.inpersonOrVirtual == 'inperson') {
              this.isInPerson = true
            }
          }
          else{
            this.isOnline=false;
            this.isInPerson = false
          }
          if (this.filterObj.hasOwnProperty('fromDate') && this.filterObj.hasOwnProperty('toDate')) {
            this.isDateFilter = true
            this.fromDate = this.filterObj.fromDate
            this.toDate = this.filterObj.toDate
          }
          else{
            this.isDateFilter=false;
          }
          if (this.filterObj.hasOwnProperty('ageFrom') && this.filterObj.hasOwnProperty('ageTo')) {
            this.isAgeFilter = true
            this.minAge = +this.filterObj.ageFrom
            this.maxAge = +this.filterObj.ageTo
          }
          else{
            this.isAgeFilter=false;
          }
          if (this.filterObj.hasOwnProperty('priceFrom') && this.filterObj.hasOwnProperty('priceTo')) {
            this.isPriceFilter = true
            this.minPrice = +this.filterObj.priceFrom
            this.maxPrice = +this.filterObj.priceTo
          }
          else{
            this.isPriceFilter=false;
          }
          if (this.filterObj.hasOwnProperty('lat') && this.filterObj.hasOwnProperty('lng')) {
            this.isMapFilter = true
            this.coordinates.lat = +this.filterObj.lat;
            this.coordinates.lng = +this.filterObj.lng;
          }
          else{
            this.isMapFilter=false;
          }
          this.programFilter(params.filter)
        } else {
          this.router.navigate(
            [],
            { relativeTo: this.activatedRoute, queryParams: {} }
          );
          this.getPublishedProgram()
        }
      })
    this.contentLoaded = false
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: `Looking for some easy and fun summer activities for your kids? By visiting Wondrfly's search page you can find best programs or classes. ` }
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'kid friendly search,kids activities search, kids programs search' }
    );

    // if (this.categoryId || this.subCats) {
    //   this.isCategoryFilter = true
    //   this.programFilter()
    //        }
    //        else{
    //          this.getPublishedProgram();
    //        }
    this.getCategory();
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       place.formatted_address;
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //       this.lat = place.geometry.location.lat();
    //       this.lng = place.geometry.location.lng();
    //       this.programByLatLng();
    //     });
    //   });
    // });
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    this.mapsAPILoader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          this.zoom = 12;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // this.getAddress(this.lat, this.lng);
          this.programByLatLng();
        });
      } this.geoCoder = new google.maps.Geocoder;
    });
  }

  programByLatLng() {
    this.apiservice.programByLatLng(this.lat, this.lng).subscribe((res: any) => {
      this.showReset = true;
      this.programs = res;
    });
    this.locationData = ''
    this.dataservice.setLocation(this.locationData)
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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
          delete this.filterObj['time'];
          this.isTimeFilter = false;
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

      case 'rating3_5':

        if (this.filterObj.hasOwnProperty('ratingFrom') && this.filterObj.hasOwnProperty('ratingTo') && this.isRating3_5) {
          this.filterObj.ratingFrom = 3;
          this.filterObj.ratingTo = 5;

        }
        else if (!this.filterObj.hasOwnProperty('ratingFrom') && !this.filterObj.hasOwnProperty('ratingTo') && this.isRating3_5) {
          Object.assign(this.filterObj, { ratingFrom: 3 });
          Object.assign(this.filterObj, { ratingTo: 5 });

        } else {
          delete this.filterObj['ratingFrom']
          delete this.filterObj['ratingTo']
        }
        break;
        case 'rating4_5':

          if (this.filterObj.hasOwnProperty('ratingFrom') && this.filterObj.hasOwnProperty('ratingTo') && this.isRating4_5) {
            this.filterObj.ratingFrom = 4;
            this.filterObj.ratingTo = 5;
  
          }
          else if (!this.filterObj.hasOwnProperty('ratingFrom') && !this.filterObj.hasOwnProperty('ratingTo') && this.isRating4_5) {
            Object.assign(this.filterObj, { ratingFrom: 4 });
            Object.assign(this.filterObj, { ratingTo: 5 });
  
          } else {
            delete this.filterObj['ratingFrom']
            delete this.filterObj['ratingTo']
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
      case 'map':
        if (this.filterObj.hasOwnProperty('lat') && this.filterObj.hasOwnProperty('lng') && Object.keys(this.coordinates).length && this.isMapFilter) {
          this.filterObj.lat = this.coordinates.lat;
          this.filterObj.lng = this.coordinates.lng;
        }
        else if (!this.filterObj.hasOwnProperty('lat') && !this.filterObj.hasOwnProperty('lng') && Object.keys(this.coordinates).length && this.isMapFilter) {
          Object.assign(this.filterObj, { lat: this.coordinates.lat });
          Object.assign(this.filterObj, { lng: this.coordinates.lng });
        } else {
          delete this.filterObj['lat']
          delete this.filterObj['lng']
        }
        break;
    }

    const filter = new URLSearchParams(this.filterObj).toString();
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute, queryParams: {
          filter: filter
        }
      }
    );
    // this.router
    // .navigateByUrl("/", { skipLocationChange: true })
    // .then(() => this.router.navigate(['/search'], {
    //   queryParams: {
    //     filter: filter
    //   }
    // }));
  }
  resetFilter() {
    // this.router.navigate(
    //   [],
    //   { relativeTo: this.activatedRoute, queryParams: {} }
    // );
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(['/search']));
    this.dataservice.setOption({})
    this.isInfiniteScrollDisabled = false
    this.contentLoaded = false
    this.searchedSubCategory = '';
    this.activityName = '';
    this.isInPerson = false;
    this.showReset = false;
    this.isTypeFilter = false;
    this.categoryId = '';
    this.isOnline = false;
    this.isDaysFilter = false
    this.isTimeFilter = false;
    // this.isTopFilterCheckBox = false
    this.isRating3_5 = false;
    this.isRating4_5 = false
    this.isTopFilter = false;
    this.isMapFilter = false;
    this.isAgeFilter = false;
    this.isDateFilter = false;
    this.selectedSubCategories = [];
    this.isPriceFilter = false;
    this.isCategoryFilter = false;
    this.maxAge = 5;
    this.minAge = 0;
    this.pageNo = 1;
    this.pageSize = 15;
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
    this.getPublishedProgram();
  }

  goToProgramDetail(data) {
    var programName = data.name;
    programName = programName.toLowerCase();
    programName = programName.replace(/ /g, "-");
    programName = programName.replace(/\?/g, "-");
    programName = programName.replace(/\//g, "-");

    let url = ``
    if (Object.keys(this.filterObj).length) {
      const filter = new URLSearchParams(this.filterObj).toString();
      url = `/program/${programName}/${data._id}/${filter}`
      return url
    }
    else {
      url = `/program/${programName}/${data._id}/filter`
      return url
    }

    // this.router.navigate(['program', programName, data._id]);
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['program', programName, data._id])
    // );
    // window.open(url, '_blank');
  }
  addAction(programId) {
    let regCount = this.activityClicked + 1
    this.cookies.set('activityClicked', String(regCount), 30);
    if (this.parentRole) {
      this.addAction(programId);
    }
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

  onScroll() {
    if (this.isScrol && !this.isCategoryFilter && !this.isAgeFilter && !this.isDateFilter && !this.isPriceFilter && !this.isTypeFilter && !this.isTimeFilter && !this.isTopFilter) {
      this.isScrol = false;
      this.loadMore();
    }
  }
  activitySorting(programs) {
    programs = programs.sort((a, b) => new Date(a.date.from).valueOf() - new Date(b.date.from).valueOf());
    return programs
  }
  setRatingFilter(min,max,e){
  }
  getPublishedProgram() {
    // this.contentLoaded = false;
    this.activityName = ''
    this.showReset = false
    this.ngxLoader.start()
    this.suggested = []
    this.apiservice.getPublishedProgramByProvider(this.pageNo, this.pageSize, 'published').subscribe((res: any) => {
      res.data = res.data.filter(item => item.user[0].isActivated === true)
      this.programs = [...this.programs, ...res.data];
      if (res.isSuccess) {
        this.providerProgram = this.programs;
        if (!res.data.length) {
          this.isInfiniteScrollDisabled = true
        }
        this.providerProgram = this.programs.sort((a, b) => b.user[0]?.averageFinalRating - a.user[0]?.averageFinalRating);
        if (!this.providerProgram.length) {
          this.isLoaded = true
        }
        // this.providerProgram[0].collapsed = true
        // this.providerProgram[1].collapsed = true
        // this.providerProgram[2].collapsed = true
        this.ngxLoader.stop()
      }
      const sum = this.providerProgram.reduce((accumulator, object) => {
        return accumulator + object.programs.length;
      }, 0);
      this.activitiesCount = sum
      // this.fakeLoaderData = [1,2]
      // this.contentLoaded = true;
      this.startTour()
      if (!this.selectedSubCategories.length && !this.categoryId) {
        this.isScrol = true;
      }
    });
  }


  getProviderbyId(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      return this.providerr = res
    })
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
        let index = res.data.findIndex(object => {
          return object._id === id;
        });
        if (~index) {
          this.searchedSubCategory = res.data[index].name
        }
      });
    }

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
    this.searchedSubCategory = cat.name
    this.apiservice.getTagByCategoryId(cat.id).subscribe((res: any) => {
      this.subCats = res.data
      this.subCats = this.subCats.filter((item) => item.isActivated === true && item.programCount);
      for (let i in this.subCats) {
        for (let id of this.tempSelectedSubCategories) {
          if (id === this.subCats[i]._id) {
            this.subCats[i].checked = true;
          }
        }
      }
    })
  }

  addFavProgram(userId, programId, providerIndx, programIndx) {
    this.providerProgram[providerIndx].programs[programIndx].isFav = true;
    this.fav.userId = userId;
    this.fav.programId = programId;
    this.apiservice.addFavProgram(this.fav).subscribe(res => {
      this.favProgramRes = res;
    });
  }

  deleteFavProgram(favId, providerIndx, programIndx) {
    this.providerProgram[providerIndx].programs[programIndx].isFav = false;
    this.apiservice.deleteFavProgram(favId).subscribe(res => {
      this.deleteProgramRes = res;
    });
  }

  loadMore() {
    this.pageNo += 1;
    this.getPublishedProgram()
    // if (this.categoryId || this.selectedSubCategories.length) {
    //   this.programFilter()
    // } else if (this.activityName) {
    //   this.filterByNameDate()
    // }
    // else {
    //   this.programFilter()
    // }
  }


  filterByNameDate() {
    this.contentLoaded = false;
    this.isCategoryFilter = false
    this.isDateFilter = false
    this.isAgeFilter = false
    this.isPriceFilter = false
    this.isTimeFilter = false;
    this.isDaysFilter = false;
    this.isTopFilter = false;
    this.isTypeFilter = false;
    this.isOnline = false;
    this.isInPerson = false;
    this.apiservice.activityByNameDate(this.activityName).subscribe((res: any) => {
      this.programs = res.data
      this.fakeLoaderData = [1, 2]
      this.contentLoaded = true;
      for (let i in this.programs) {
        let category = this.programs[i].category.filter((v, num, a) => a.findIndex(t => (t.name === v.name)) === num)
        this.programs[i].category = category
      }
      // this.startTour()
      this.showReset = true
      this.searchedSubCategory = this.activityName;
    });
  }
  parentAnalyticAction(key, value) {
    this.apiservice.parentAnalytics(key, this.userId, value).subscribe((res: any) => {
    });
  }
  programFilter(filter) {
    let pageSize = 50;
  if(this.filterObj.hasOwnProperty('lat') && this.filterObj.hasOwnProperty('lng')){
      pageSize = 5
    }
    this.ngxLoader.start()
    this.apiservice.programFilter(filter, 1, pageSize).subscribe((res: any) => {
      this.showReset = true
      if (res.isSuccess) {
        // this.isTopFilterCheckBox = false
        res.items = res.items.filter(item => item.user[0].isActivated === true)
        this.programs = res.items;
        if (this.isRating3_5 || this.isRating4_5) {
          this.providerProgram = this.programs.sort((a, b) => b.user[0]?.averageFinalRating - a.user[0]?.averageFinalRating);
        }
        else {
          this.providerProgram = this.programs;
        }
        if (!this.providerProgram.length) {
          this.isLoaded = true
        }
        this.ngxLoader.stop()
        if (!this.selectedSubCategories.length && this.providerProgram.length) {
          const sum = this.providerProgram.reduce((accumulator, object) => {
            return accumulator + object.programs.length;
          }, 0);
          this.activitiesCount = sum
        }
        else if(this.selectedSubCategories.length && this.providerProgram.length){
          this.activitiesCount = res.total
        }
        else{
          this.activitiesCount = 0
        }
        // }
        // for (let i in this.programs) {
        //   let category = this.programs[i].category.filter((v, num, a) => a.findIndex(t => (t.name == v.name)) === num)
        //   this.programs[i].category = category
        // }
        this.startTour()
        this.isScrol = false;
      }
      var filterObj = JSON.parse('{"' + filter.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
    });
    // }
    // else {
    //   this.pageNo = 1
    //   this.programs = []
    //   this.isTopFilterCheckBox = false
    //   this.getPublishedProgram();
    // }
  }
  searchCategory(key?) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.categoriesBySearch = res;
      this.categoriesBySearch = this.categoriesBySearch.filter((item) => item.isActivated !== false);

    })
  }
  providerSearch(key) {
    this.apiservice.searchUsers(key, 'provider').subscribe((res: any) => {
      this.providersBySearch = res.data;
    })
  }
  getProviderById(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      this.user = res.data;
    });
  }
  goToProviderProfile(provider, scrollToActivities?) {
    if (scrollToActivities === 'activities') {
      this.dataservice.setScrollToActivities(scrollToActivities)
    }
    var providerName = provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g, "-");
    providerName = providerName.replace(/\?/g, "-");
    this.router.navigate(['/provider/program-provider', providerName, provider._id]);
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/provider/program-provider', providerName, provider._id])
    // );
    // window.open(url, '_blank');
  }

  ngOnDestroy() {
    this.joyride.closeTour()
    window.document.getElementById("close_modal").click();
    // window.document.getElementById("close_morefilter").click();
    window.document.getElementById("close_sharemodal").click();

  }

  // ---------------------------------navigate to program detail page -------------------------------------------
  getRating(id, indx) {
    if (this.isRating) {
      this.apiservice.getUserRating(id).subscribe((res: any) => {
        res.finalAverageRating = parseFloat(String(res.finalAverageRating)).toFixed(1)
        this.rating = res
        this.providerProgram[indx].rating = this.rating
      });
    }
    if (this.providerProgram[indx].isCollapsed) {
      this.providerProgram[indx].isCollapsed = false
    }
    else {
      this.providerProgram[indx].isCollapsed = true
    }
  }

  //----------------------------------------search history get ---------------------------------------------------------
  // getTopRated() {
  //   this.contentLoaded = false
  //   this.searchedSubCategory = '',
  //     this.activityName = ''
  //   this.isInPerson = false
  //   this.showReset = true
  //   this.isTypeFilter = false
  //   this.categoryId = ''
  //   this.isOnline = false;
  //   this.isDaysFilter = false
  //   this.isTimeFilter = false;
  //   this.isTopFilter = false;
  //   this.isAgeFilter = false;
  //   this.isDateFilter = false;
  //   this.selectedSubCategories = [];
  //   this.isPriceFilter = false;
  //   this.isCategoryFilter = false;
  //   this.maxAge = 5;
  //   this.minAge = 0;
  //   this.pageNo = 1;
  //   this.pageSize = 10;
  //   this.selectedProgramTime = []
  //   this.times.forEach((element) => {
  //     element.nativeElement.checked = false;
  //   });
  //   this.selectedDays = []
  //   this.days.forEach((element) => {
  //     element.nativeElement.checked = false;
  //   });
  //   this.selectedProgramTypes = []
  //   this.types.forEach((element) => {
  //     element.nativeElement.checked = false;
  //   });
  //   if (this.isTopFilterCheckBox == true) {
  //     this.apiservice.getTopRated().subscribe((res: any) => {
  //       this.programs = res
  //       this.contentLoaded = true;
  //     });
  //   }
  //   else if (this.isTopFilterCheckBox == !true) {
  //     this.showReset = true
  //     this.resetFilter();
  //     this.contentLoaded = true;
  //   }
  // }


  // ---------------------suggested sub categories by sub catids -----------------------
  suggestedSubCategories(id) {
    window.scroll(0, 0)
    this.apiservice.getSuggestedCategory(id).subscribe((res: any) => {
      if (typeof (res) !== 'string') {
        if (!res.error) {
          this.suggested = res
        }
      }
      // this.searchedSubCategory = this.suggested[0].name
      else {
        this.suggested = []
      }
    });
    this.showReset = true;
  }

  // ----------------------------------exploreModal functionality--------------------------------------
  // exploreModal() {
  //   if (this.explore_modal_cookies_data!=='1') {
  //     setTimeout(() => {
  //       window.document.getElementById("exploreModal").click();
  //     });
  //   }
  //   this.cookies.set('exploreModal', '1', 30);
  // }
  removeRecentSearches(type, indx) {
    this.contentLoaded = false;
    switch (type) {
      case 'days':
        this.days.forEach((element) => {
          if (element.nativeElement.defaultValue === this.selectedDays[indx]) {
           return element.nativeElement.checked = false;
          }
        });
        this.selectedDays.splice(indx, 1);
        this.setFilterQuery('day')
        break;

      case 'times':
        this.times.forEach((element) => {
          if (element.nativeElement.value === this.selectedProgramTime[indx]) {
            element.nativeElement.checked = false;
          }
        });
        this.selectedProgramTime.splice(indx, 1);
        this.setFilterQuery('time')
        break;

      case 'types':
        this.types.forEach((element) => {
          if (element.nativeElement.value === this.selectedProgramTypes[indx]) {
            element.nativeElement.checked = false;
          }
        });
        this.selectedProgramTypes.splice(indx, 1);
        this.setFilterQuery('type')
        break;
    }
  }

  scrollLeft(i) {
    document.getElementById('widgetsContent' + i).scrollLeft -= 650;
    // this.checkScroll()
  }

  scrollRight(i) {
    document.getElementById('widgetsContent' + i).scrollLeft += 650;
    // this.checkScroll()
  }
  //  save provider
  saveUnsaveProvider(indx, boleanType) {
    let model = {
      parent: this.userId,
      provider: this.providerProgram[indx]._id
    }
    if (boleanType) {
      this.providerProgram[indx].isFav = boleanType
      this.apiservice.saveProvider(model).subscribe((res: any) => {
      });
    }
    else {
      this.providerProgram[indx].isFav = boleanType
    }
  }
}

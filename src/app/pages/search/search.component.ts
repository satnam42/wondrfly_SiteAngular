import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Category, User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { JoyrideService } from 'ngx-joyride';
import { AuthsService } from 'src/app/core/services/auths.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globals } from 'src/app/core/common/imageLoader';
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
  isTopFilterCheckBox: boolean = false;
  isAlert: boolean = true;
  isFav: boolean = false;
  categoryId: any = ''
  activityName: any = ''
  rating: any;
  filterData: any = {};
  locationData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  isLoaded = false
  locations = [];
  categories: Category[];
  categoriesBySearch: any = new Category;
  isActive: boolean = false
  providersBySearch: any = new User;
  userData: any = {};
  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 20;
  programs: any = [];
  providerProgram: any = [];
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
  zoom = 13;
  address: string;
  private geoCoder;
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
  programTypes = ['Camps', 'Semesters', 'Drops-in', 'Other']
  programTimes = ['early-morning', 'morning', 'afternoon', 'late-afternoon', 'evening']
  programTimesShow = ['6am - 9am', '9am - 12pm', '12pm - 3pm', '3pm - 6pm', '6pm - 9pm']
  selectedDays: any = []
  selectedProgramTypes: any = []
  selectedProgramTime: any = []
  contentLoaded = false;
  fakeLoaderData = [1, 2]
  currentUser: any;
  cookiesData: string;
  regWallCookies = 0
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
    private apiservice: ApiService,
    private auth: AuthsService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    private ngZone: NgZone,
    private toast: ToastrService,
    private titleService: Title,
    private metaTagService: Meta,
    private cookies: CookieService,
    private joyride: JoyrideService,
    private ngxLoader: NgxUiLoaderService,
    public globalFunc: Globals
  ) {
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
    this.regWallCookies = Number(this.cookies.get('regWall'))

    this.contentLoaded = false
    this.currentUser = auth.currentUser();
    this.filterData = dataservice.getOption()
    // this.exploreModal()
    var retrievedObject = localStorage.getItem('CurrentUserWondrfly');
    this.userData = JSON.parse(retrievedObject);
    if (this.filterData.subcatId || this.filterData.categoryId || this.filterData.kidAge) {
      this.categoryId = this.filterData.categoryId
      this.searchedSubCategory = this.filterData.searchedCategoryKey
      if (this.filterData.subcatId) {
        this.selectedSubCategories[0] = this.filterData.subcatId;
      }
      if (this.filterData.childIntrests) {
        for (let intrest of this.filterData.childIntrests) {
          this.selectedSubCategories.push(intrest)
        }
      }
      if (this.filterData.kidAge?.length) {


        if (this.filterData.kidAge >= 1) {
          this.isAgeFilter = true
          this.maxAge = Number(this.filterData.kidAge)
          this.minAge = 0
        }
        if (this.filterData.kidAge < 1) {
          this.isAgeFilter = true
          this.maxAge = 1
          this.minAge = 0
        }
      }
      if (this.filterData?.online) {
        this.isOnline = true;
      }
      this.programFilter()
    }
    else if (this.filterData.activityName) {
      this.activityName = this.filterData.activityName
      this.filterByNameDate()
    }
    else {
      this.getPublishedProgram()
    }
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
      window.document.getElementById("exploreModal").click();
      this.cookies.set('isTour', '4', 30);
      window.scroll(0, 0);
    }
    this.cookiesData = this.cookies.get('isTour');
  }

  choosedDate(e) {
    this.fromDate = e.startDate._d
    this.toDate = e.endDate._d
  }

  centerChange(e) {
    this.locations.push(e);
    if (this.locations.length > 15) {
      this.locations = [];
      this.lat = e.lat;
      this.lng = e.lng;
      // this.programByLatLng();
    }

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
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          place.formatted_address;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.programByLatLng();
        });
      });
    });




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

  resetFilter() {
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
    this.getPublishedProgram();
  }

  goToProgramDetail(data) {
    if (this.parentRole) {
      this.addAction(data._id);
    }
    var programName = data.name;
    programName = programName.toLowerCase();
    programName = programName.replace(/ /g, "-");
    programName = programName.replace(/\?/g, "-");
    this.router.navigate(['program', programName, data._id]);
  }
  addAction(programId) {
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

  getPublishedProgram() {
    // this.contentLoaded = false;
    this.activityName = ''
    this.showReset = false
    this.ngxLoader.start()
    this.suggested = []
    this.apiservice.getPublishedProgramByProvider(this.pageNo, this.pageSize, 'published').subscribe((res: any) => {
      this.programs = this.programs.concat(res.data);
      if (res.isSuccess) {
        this.providerProgram = this.programs;
        if (!this.providerProgram.length) {
          this.isLoaded = true
        }
        this.providerProgram[0].collapsed = true
        this.providerProgram[1].collapsed = true
        this.providerProgram[2].collapsed = true
        this.ngxLoader.stop()
      }
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
  programFilter() {
    if (this.regWallCookies > 11) {
      this.isBetaPopUp = true
    }
    window.scroll(0, 0);
    this.isTimeFilter = false;
    this.isDaysFilter = false;
    this.isTopFilter = false;
    this.isTypeFilter = false;
    this.isCategoryFilter = false;
    this.suggested = []
    if (this.isTopFilterCheckBox || this.categoryId || this.selectedDays.length || this.selectedProgramTypes.length || this.selectedSubCategories.length || this.selectedProgramTime.length || this.isOnline || this.isInPerson || this.isDateFilter || this.isPriceFilter || this.isAgeFilter) {
      this.fakeLoaderData = [1, 2]
      this.contentLoaded = false;
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
        this.parentAnalyticAction('category', categoryId)
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
          this.suggestedSubCategories(tag)
          tags += tag
          tagsCount++
        }
        else {
          tags += ',' + tag
        }
        this.parentAnalyticAction('subCategory', tag)
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
      filter = `time=${times}&categoryId=${categoryId}&tagsIds=${tags}&type=${types}&inpersonOrVirtual=${inpersonOrVirtual}&day=${days}`
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
      this.apiservice.programFilter(filter, 1, 100).subscribe((res: any) => {
        this.showReset = true
        if (res.isSuccess) {
          // this.isTopFilterCheckBox = false
          this.programs = res.data;
          this.providerProgram = this.programs;
          console.log('this.providerProgram', this.providerProgram)
          if (!this.providerProgram.length) {
            this.isLoaded = true
          }
          if (this.providerProgram.length) {
            this.providerProgram[0].collapsed = true
          }
          if (this.providerProgram.length == 2) {
            this.providerProgram[1].collapsed = true
          }
          else if (this.providerProgram.length > 2) {
            this.providerProgram[1].collapsed = true
            this.providerProgram[2].collapsed = true
          }
          if (categoryId || this.selectedSubCategories.length) {
            const sum = this.providerProgram.reduce((accumulator, object) => {
              return accumulator + object.programs.length;
            }, 0);
            this.activitiesCount = sum
          }
          // for (let i in this.programs) {
          //   let category = this.programs[i].category.filter((v, num, a) => a.findIndex(t => (t.name == v.name)) === num)
          //   this.programs[i].category = category
          // }
          this.startTour()
          this.isScrol = false;
        }
        this.ngxLoader.stop()
      });
    }
    else {
      this.pageNo = 1
      this.programs = []
      this.isTopFilterCheckBox = false
      this.getPublishedProgram();
    }
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
  }

  ngOnDestroy() {
    this.joyride.closeTour()
    window.document.getElementById("close_modal").click();
    // window.document.getElementById("close_morefilter").click();
    window.document.getElementById("close_sharemodal").click();

  }

  // ---------------------------------navigate to program detail page -------------------------------------------
  getRating(id) {
    this.apiservice.getUserRating(id).subscribe((res: any) => {
      this.rating = res
      this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
    });
  }

  //----------------------------------------search history get ---------------------------------------------------------
  getTopRated() {
    this.contentLoaded = false
    this.searchedSubCategory = '',
      this.activityName = ''
    this.isInPerson = false
    this.showReset = true
    this.isTypeFilter = false
    this.categoryId = ''
    this.isOnline = false;
    this.isDaysFilter = false
    this.isTimeFilter = false;
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
    if (this.isTopFilterCheckBox == true) {
      this.apiservice.getTopRated().subscribe((res: any) => {
        this.programs = res
        this.contentLoaded = true;
      });
    }
    else if (this.isTopFilterCheckBox == !true) {
      this.showReset = true
      this.resetFilter();
      this.contentLoaded = true;
    }
  }


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

  scrollLeft(i) {
    document.getElementById('widgetsContent' + i).scrollLeft -= 650;
    // this.checkScroll()
  }

  scrollRight(i) {
    document.getElementById('widgetsContent' + i).scrollLeft += 650;
    // this.checkScroll()
  }
}

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Category, Child, User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { Globals } from 'src/app/core/common/imageLoader';
import { MapTheme } from 'src/app/core/common/map-theme';
import { environment } from 'src/environments/environment.prod';

import { Meta, Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isDateFilter: boolean = false;
  isTimeFilter: boolean = false;
  isDaysFilter: boolean = false;
  isAgeFilter: boolean = false;
  isTopFilter: boolean= false;
  isTopFilterCheckBox:boolean=false;
  isChildFilter: boolean = false;
  isPriceFilter: boolean = false;
  isTypeFilter: boolean = false;
  isOpenFilter: boolean = false;
  isSavedFilter: boolean = false;
  isCategoryFilter: boolean = false;
  isDateModal: boolean = false;
  isTimeModal: boolean = false;
  isAgeModal: boolean = false;
  isChildModal: boolean = false;
  isPriceModal: boolean = false;
  isDaysModal: boolean = false;
  isCategoryModal: boolean = false;
  isFav: boolean = false;
  categoryId: any = ''
  activityName: any = ''
  rating: any;
  activityDate: any
  filterData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  kids = new Child;
  locations = [];
  categories = new Category;
  categoriesBySearch : any = new Category;
  providersBySearch : any= new User;
  userData: any = {};
  programList: any;
  // totalPages: number;
  filterClass: boolean = false;
  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 20;
  programs: any=[];
  randomNumber:any = 0;
  isLogin: Boolean = false;
  key: string = '';
  providerRole: boolean = false;
  parentRole: boolean = false;
  favProgramRes: any;
  keyword = 'name';
  searchKey = '';
  isSearched = false;
  isScrol
    = true;
  fav: any = {
    userId: '',
    programId: '',
  };
  searchedPrograms: any = [];
  searchedProgram: any = [];
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  fromDate: any;
  toDate: any;
  fromTime: any;
  timeSession = ''
  typeChecked =''
  daysChecked=''
  day=''
  toTime: any;
  dateRange:any = {};
  minPrice: any = 50;
  maxPrice: any = 300;
  favourites: any = [];
  facebookActive = ''
  messengerActive = ''
  emailActive = ''
  whatsappActive = ''
  copylinkActive = ''
  durationMin: number = 20
  durationMax: number = 30
  totalRating:any = '';

  //  ng5slider start age group
  minAge: number = 3;
  maxAge: number = 12;
  ageOption: Options = {
    floor: 0,
    ceil: 21,
    translate: (value: number): string => {
      return value + ' YRS';
    }
  };

   priceOption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return value + ' $';
    }
  };
  durationOption: Options = {
    floor: 0,
    ceil: 60,
    translate: (value: number): string => {
      return value + ' HOUR';
    }
  };


  // ng5slider end
  showReset = false;
  deleteProgramRes: any;
  title = 'Search for Online Classes and Programs - Wondrfly';
  // latitude: number = 40.5682945; longitude: number = -74.0409239;
  lat = 40.712776;
  lng = -74.005974;
  zoom = 14;
  address: string;
  private geoCoder;
  user = new User
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  recentSearch: any;
  shareUrlSocial = environment.shareUrl;
  baseUrl= environment.baseUrl;
  shareUrl:string;
  selectedProgramId: string;
  url: string;
  suggested: any =[];
  programOwnerData:any = User
  isOnline:boolean = false;
  isInPerson:boolean = true;
  type1: any
  type2: any
  subCats: any=[];
  previous;
  filterName='';
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    public imageLoader: Globals,
    public mapTheme: MapTheme,
    private ngZone: NgZone,
    private titleService: Title,
    private metaTagService: Meta,

  ) {
    this.filterData = dataservice.getOption()
    if (this.filterData) {
      this.categoryId = this.filterData.categoryId
      this.activityName = this.filterData.activityName
      this.activityDate = this.filterData.activityDate
    }
    // if (navigator) {
    //   navigator.geolocation.getCurrentPosition(pos => {
    //     this.lat = +pos.coords.longitude;
    //     this.lng = +pos.coords.latitude;
    //   });
    // }
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);
    if (this.userData) {
      this.isLogin = true;
      if (this.userData.role === 'provider') {
        this.providerRole = true;
        this.parentRole = false;
      }
      if (this.userData.role === 'parent') {
        this.parentRole = true;
        this.providerRole = false;
        this.getChildren()
      }
    }
  }

choosedDate(e){
this.fromDate =e.startDate._d
this.toDate=e.endDate._d
  }

  centerChange(e) {
    this.locations.push(e);
  if(this.locations.length>15){
    this.locations = [];
    this.lat = e.lat;
    this.lng = e.lng;
    this.programByLatLng();
  }

  }
  suggestedPrograms(){
    if(this.programs.length){
      this.randomNumber = Math.floor(Math.random() * this.programs.length);
      console.log('programs',this.programs)
        this.categoryId=this.programs[this.randomNumber].category[0]._id;
        var filter = `categoryId=${this.categoryId}`
        this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
          this.suggested = res.data
          console.log('suggested', this.suggested);
        })
    }
  }
  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

 mapClicked(e){
  this.clickedMarker(e)
 }
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: `Looking for some easy and fun summer activities for your kids? By visiting Wondrfly's search page you can find best programs or classes. ` }
    );

    window.scroll(0, 0);

    // this.getSearchHistory()
    if (this.categoryId) {
      this.isCategoryFilter = true
      this.fromTime = null;
      this.toTime = null;
      this.minAge = null;
      this.maxAge = null;
      this.fromDate = null;
      this.toDate = null;
      this.minPrice = null
      this.maxPrice = null
    }
    else {
      if (this.activityDate || this.activityName) {
        this.filterByNameDate()
      } else {
        this.getPublishedProgram();
      }
    }
    this.getCategory();
    this.mapsAPILoader.load().then(() => {
   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
   autocomplete.addListener('place_changed', () => {
     this.ngZone.run(() => {
       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      place.formatted_address;
      console.log(place.formatted_address)
       if (place.geometry === undefined || place.geometry === null) {
         return;
       }
       this.lat = place.geometry.location.lat();
       this.lng= place.geometry.location.lng();
       this.programByLatLng();
     });
   });
    });

  }

  // Get Current Location Coordinates
   setCurrentLocation() {
    this.mapsAPILoader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position:any) => {
          this.zoom = 14;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat,this.lng)
          // this.getAddress(this.lat, this.lng);
          this.programByLatLng();
        });
      }      this.geoCoder = new google.maps.Geocoder;
    });
  }

  programByLatLng(){
    this.apiservice.programByLatLng(this.lat, this.lng).subscribe(res => {
      console.log('programs', res);
      // this.programs = []; // testing

      // if (this.programList.items) {
      //   this.programs = this.programList.items;
      //   this.isScrol = true;
      // }
    });

  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          console.log(this.address)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  openModal(a, b, c, d, e, f, g, h, i, j, k, l) {
    // if (this.isAgeModal || this.isChildModal) {
    //   this.fromDate = null;
    //   this.toDate = null;
    //   this.fromTime = null;
    //   this.toTime = null;
    //   this.minPrice = null;
    //   this.maxPrice = null;
    //   this.categoryId = null
    //   this.minAge = 3
    //   this.maxAge = 12
    // }
    // else if (this.isTimeModal) {
    //   this.fromDate = null;
    //   this.toDate = null;
    //   this.minAge = null;
    //   this.maxAge = null;
    //   this.minPrice = null;
    //   this.maxPrice = null;
    //   this.categoryId = null
    // }
    // else if (this.isDateModal) {
    //   this.fromTime = null;
    //   this.toTime = null;
    //   this.minAge = null;
    //   this.maxAge = null;
    //   this.minPrice = null;
    //   this.maxPrice = null;
    //   this.categoryId = null
    // }
    // else if (this.isPriceModal) {
    //   this.fromTime = null;
    //   this.toTime = null;
    //   this.minAge = null;
    //   this.maxAge = null;
    //   this.fromDate = null;
    //   this.toDate = null;
    //   this.categoryId = null
    //   this.minPrice = 50
    //   this.maxPrice = 250
    // }
    // else if (this.isCategoryModal) {
    //   this.fromTime = null;
    //   this.toTime = null;
    //   this.minAge = null;
    //   this.maxAge = null;
    //   this.fromDate = null;
    //   this.toDate = null;
    //   this.minPrice = null
    //   this.maxPrice = null
    // }

  }
  mouseOver() {
    console.log('in');
  }
  mouseOut() {
    console.log('out');
  }
  onFilter() {
    this.filterClass = !this.filterClass;
  }
  closePopup() {

    if (this.isDateModal) {
      this.fromDate = null;
      this.toDate = null;
      this.isDateModal = false;
      this.isDateFilter = false;
    } else if (this.isTimeModal) {
      this.toTime = null;
      this.fromTime = null;
      this.isTimeModal = false;
      this.isTimeFilter = false;
    } else if (this.isAgeModal) {
      this.maxAge = 12;
      this.maxAge = 3;
      this.isAgeModal = false;
      this.isAgeFilter = false;
    } else if (this.isPriceModal) {
      this.maxPrice = 250;
      this.minPrice = 50;
      this.isPriceModal = false;
      this.isPriceFilter = false;
    }

  }


  resetFilter() {
    // window.document.getElementById("close_morefilter").click();
    this.activityName = ''
    this.activityDate = undefined
    this.showReset = false;
    this.isOpenFilter = false;
    this.isTypeFilter=false
    this.isOnline=false;
    this.isInPerson=true
    this.isTimeFilter = false;
    this.isSavedFilter = false;
    this.isTopFilterCheckBox=false
    this.isTopFilter= false;
    this.isChildFilter = false;
    this.isAgeFilter = false;
    this.isDateFilter = false;
    this.isPriceFilter = false;
    this.isCategoryFilter = false;
    this.fromDate = null;
    this.toDate = null;
    this.toTime = null;
    this.fromTime = null;
    this.maxAge = 100;
    this.maxAge = 0;
    this.getPublishedProgram();
    this.closePopup();

  }

  goToProgramDetail(data) {
    if (this.parentRole) {
      this.addAction(data._id);
    }
    var programName = data.name;
  programName = programName.toLowerCase();
  programName = programName.replace(/ /g,"-");
  programName = programName.replace(/\?/g,"-");
    this.router.navigate(['program',programName,data._id]);
  }

  onScroll() {
    if (this.isScrol) {
      this.isScrol = false;
      this.loadMore();
    }
  }

  profile() {
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['/login']);
    }
    if (this.userData) {
      this.router.navigate(['parent/parent-profile']);
    }
  }

  getPublishedProgram() {
    this.activityName = ''
    this.activityDate = undefined
    this.showReset = false
    if (this.isSearched) {
      this.programs = this.searchedProgram;
    } else {
      this.ngxLoader.start()
      this.apiservice.getPublishedProgram(this.pageNo, this.pageSize, 'published').subscribe(res => {
        this.programList = res;
        this.ngxLoader.stop()
        console.log('programs', res);
        if (this.programList.items) {
          this.programs = this.programList.items;
          this.isScrol = true;
        }
      });
    }
    this.ngxLoader.stop()
  }
  getChildren() {
    this.apiservice.getChildByParentId(this.userData.id).subscribe((res: any) => {
      this.kids = res
    })
  }

  // ---------------------------------------------get categories-------------------------------------
  getCategory() {
    this.ngxLoader.start();
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res
      this.getSubCateById(this.categories[3].id)
      this.ngxLoader.stop();
    })
  }

  // ---------------------------------------------get categories-------------------------------------
  getSubCateById(id){
    this.apiservice.getTagByCategoryId(id).subscribe((res: any) => {
      this.subCats = res.data
      console.log('categories', this.subCats)
    })
  }

  getOpenPrograms(value) {
    console.log('valuee',value)
    if(value){
    this.activityName = ''
    this.activityDate = undefined
    this.isScrol = false
    this.showReset = true
    this.isOpenFilter = true
    this.isSavedFilter = false
    this.isPriceModal = false
    this.isPriceFilter = false
    this.isChildModal = false
    this.isChildFilter = false
    this.isDateFilter = false
    this.isAgeFilter = false
    this.isTimeFilter = false
    this.isCategoryFilter = false
    this.isDateModal = false
    this.isAgeModal = false
    this.isTimeModal = false
    this.isCategoryModal = false
    this.ngxLoader.start();

    this.apiservice.getOpenPrograms(this.pageNo, this.pageSize).subscribe((res: any) => {
      this.programs = res
      console.log('open programs', this.programs)
      this.ngxLoader.stop();
    })
  }
    else{
      this.resetFilter();
    }
    // window.document.getElementById("close_morefilter").click();
  }

  pagination(pageNo) {
    // let scrollToTop = document.getElementById('scrollToTop');
    // scrollToTop.scrollTop = 0;
    this.pageNo = pageNo;
    this.getPublishedProgram();
  }
  addFavProgram(userId, programId, index) {
    this.programs[index].isFav = true;
    this.fav.userId = userId;
    this.fav.programId = programId;
    this.apiservice.addFavProgram(this.fav).subscribe(res => {
      this.favProgramRes = res;
    });
  }

  deleteFavProgram(favId, index) {
    this.programs[index].isFav = false;
    this.apiservice.deleteFavProgram(favId).subscribe(res => {
      this.deleteProgramRes = res;
    });
  }

  addAction(programId) {
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

  loadMore() {
    this.loaderType = 'three-bounce';
    this.loaderPostion = 'bottom-center';
    this.pageSize += 20;
    if (this.isOpenFilter) {
      this.getOpenPrograms('value')
    }
    else if (this.isSavedFilter) {
      this.getFav(this.userData.id,this.isSavedFilter)
    }
    else {
      if (this.showReset) {
        if (this.activityDate || this.activityName) {
          this.filterByNameDate()
        }

      }
      else {
        this.getPublishedProgram();
      }
    }
  }

  onSearch(val: string) {
    this.programSearch(val);
  }

  programSearch(key) {
    this.activityName = ''
    this.activityDate = undefined
    this.ngxLoader.start();
    this.apiservice.programSearch(key).subscribe((res: any) => {
      if (res) {
        this.programs = res;
        this.ngxLoader.stop();
      }
    });
  }


  getFav(id,toggle) {
    console.log('toggle',toggle)
if(toggle){
    // this.filterClass = false
    this.isDateFilter = false;
    this.isAgeFilter = false;
    this.isChildFilter = false;
    this.isPriceFilter = false
    this.isOpenFilter = false
    this.isCategoryFilter = false
    this.isSavedFilter = true
    this.programs = []
    this.showReset = true
    this.ngxLoader.start();
    this.apiservice.getFavouriteByParentId(id).subscribe((res: any) => {
      console.log('fav', res)
      res.forEach(program => {
        program.program.isFav = true;
        this.programs.push(program.program)
        console.log('fav programs', this.programs)

      });
      this.ngxLoader.stop();
    });
  }
  else{
    this.resetFilter();
  }
  // window.document.getElementById("close_morefilter").click();
  }


  filterByChild(kidData) {
    // window.document.getElementById("close_morefilter").click();
    this.isChildFilter = true;
    this.filterClass = false;
    this.minAge = 0;
    this.maxAge = Number(kidData.age)
  }

  filterByCategory(id) {
    this.categoryId = id
    var filter = `categoryId=${this.categoryId}`
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      console.log('response', res);
      if (res.isSuccess) {
        this.programs = res.data;
        this.isScrol = true;
      }
    });  }
  filterByNameDate() {
    this.isCategoryFilter = false
    this.isDateFilter = false
    this.isAgeFilter = false
    this.isChildFilter = false
    this.isPriceFilter = false
    this.isOpenFilter = false
    this.isSavedFilter = false
    this.ngxLoader.start();
    if (this.activityName || this.activityDate) {
      this.apiservice.activityByNameDate(this.activityName, this.activityDate).subscribe((res: any) => {
        console.log('filterbyNameDate', res)
        this.ngxLoader.stop();
        this.programs = res.data
        this.showReset = true
     this.suggestedPrograms();
        console.log('res', this.programs)
      });
      this.ngxLoader.stop();
      this.suggestedPrograms()
    } else {
      this.getPublishedProgram();
    }
  }
  suggestedProgramss(){
      this.categoryId='60b47687bb70a952280bfa7b'
      var filter = `categoryId=${this.categoryId}`
      this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
        this.suggested = res.data
        console.log('suggested', this.suggested);
      })

  }
  programFilter() {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "YYYY-MM-DD HH:mm:ss"
    this.activityName = ''
    this.activityDate = undefined
    this.showReset = true;
    var from: any
    var to: any
    this.categoryId=''
    let inpersonOrVirtual =''
    if(this.isOnline){
      inpersonOrVirtual='online'
    }
    else if(this.isInPerson){
      inpersonOrVirtual='inperson'
    }
    else {inpersonOrVirtual='' }
 // -------------------------------------------days filter-----------------------------------------
    if(this.daysChecked){
      this.day= this.daysChecked
    }else{
      this.day=''
    }

  // -------------------------------------------type filter-----------------------------------------
    // if(this.typeChecked && !this.type1){
    //  this.type1 = this.typeChecked
    // }else if(this.type1){
    //   this.type2 = this.typeChecked
    // }else{
    //   this.type1=''
    //   this.type2=''
    // }
    // -------------------------------------------time filter-----------------------------------------
    switch(this.timeSession){
      case 'early-morning':{
      this.fromTime = new Date(2018, 0O5, 0O5, 6, 0, 0, 0)
      this.toTime = new Date(2050, 0O5, 0O5, 9, 0, 0, 0)
      break;
      }
        case 'morning':{
          this.fromTime = new Date(2018, 0O5, 0O5, 9, 0, 0, 0)
      this.toTime = new Date(2050, 0O5, 0O5, 12, 0, 0, 0)
      break;
        }
          case 'afternoon':{
            this.fromTime = new Date(2018, 0O5, 0O5, 12, 0, 0, 0)
      this.toTime = new Date(2050, 0O5, 0O5, 15, 0, 0, 0)
      break;
          }
            case 'late-afternoon':{
              this.fromTime = new Date(2018, 0O5, 0O5, 15, 0, 0, 0)
      this.toTime = new Date(2050, 0O5, 0O5, 18, 0, 0, 0)
      break;
            }
              case 'evening':{
                this.fromTime = new Date(2018, 0O5, 0O5, 18, 0, 0, 0)
      this.toTime = new Date(2050, 0O5, 0O5, 21, 0, 0, 0)
      break;
              }
              default: {
                this.fromTime = new Date(2018, 0O5, 0O5, 0O1, 0, 0, 0)
                this.toTime = new Date(2050, 0O5, 0O5, 23, 59, 0, 0)
              }
    }
    console.log('time session>>>>>>>>>',this.timeSession)
    var filter = ``
    from = moment(this.fromTime).format(timeFormat);
    to = moment(this.toTime).format(timeFormat);
    if(this.fromDate && this.toDate){
    this.fromDate = moment(this.fromDate).format(dateFormat);
    this.toDate = moment(this.toDate).format(dateFormat);
    }
    switch(this.filterName){
      case 'age':{

        filter = `ageFrom=${this.minAge}&ageTo=${this.maxAge}`
        break;
      }
    case 'type':{
      filter = `type1=${this.typeChecked}`
      break;
    }
    case 'date':{
      filter = `fromDate=${this.fromDate}&toDate=${this.toDate}`
      break;
    }
    case 'time':{
      filter = `fromTime=${from}&toTime=${to}`
      break;
    }
    case 'price':{
      filter = `priceFrom=${this.minPrice}&priceTo=${this.maxPrice}`
      break;
    }
   case 'day':{
      filter = `day=${this.day}`
      break;
    }
  }
      // filter = `ageFrom=${this.minAge}&ageTo=${this.maxAge}&fromTime=${from}&toTime=${to}&fromDate=${this.fromDate}&toDate=${this.toDate}&priceFrom=${this.minPrice}&priceTo=${this.maxPrice}&inpersonOrVirtual=${inpersonOrVirtual}&type1=${this.type1}&type2=${this.type2}&day=${this.day}`
      console.log('filter>>>>>>>>>>>>',filter)

    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      console.log('filter response', res);
      if (res.isSuccess) {
        this.isTopFilterCheckBox=false
        this.programs = res.data;
        this.isScrol = true;
      }
    });
    this.suggestedProgramss();
  }

   // ---------------------------------------------getinpersonOrVirtual------------------------------
  inpersonOrVirtual(e){
    var filter=``
    filter = `inpersonOrVirtual=${e}`
    console.log('filter>>>>>>>>>>>>',filter)
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      console.log('inpersonVirtual response', res);
      if (res.isSuccess) {
        this.showReset = true;
        this.isTopFilterCheckBox=false
        this.programs = res.data;
        this.isScrol = true;
      }
    });
  }


  //----------------------------------------search program by recent searches list click  ---------------------------------------------------------
  searchProgram(data) {
    this.activityName = data
    this.apiservice.activityByNameDate(this.activityName, this.activityDate).subscribe((res: any) => {
      console.log('filterbyNameDate', res)
    })
  }

  //----------------------------------------search history save ---------------------------------------------------------
  searchHistory() {
    if (this.userData) {
      this.user.userId = this.userData.id;
      this.user.searchData = this.activityName
      console.log('program info before search', this.user);
      this.apiservice.searchHistory(this.user).subscribe((res: any) => {
        console.log('history after search', res);
        // this.getSearchHistory()

      });
    }

  }

  //----------------------------------------search history get ---------------------------------------------------------
  // getSearchHistory() {
  //   if (this.userData) {
  //     this.apiservice.getSearchHistory(this.userData.id).subscribe((res: any) => {
  //       this.recentSearch = res.data
  //       console.log('get search', this.recentSearch);
  //     });
  //   }
  // }

  //----------------------------------------delete search history  ---------------------------------------------------------
  deleteSearchHistory(item) {
    this.apiservice.deleteSearchHistory(item._id, item.user).subscribe((res: any) => {
      console.log('deleted', res)
      // this.getSearchHistory()
    })
  }

  //----------------------------------------clearAll search history  ---------------------------------------------------------
  clearAllSearchHistory() {
    this.apiservice.clearAllSearchHistory(this.userData.id).subscribe((res: any) => {
      console.log('deleted', res)
      // this.getSearchHistory()
    })
  }
  //----------------------------------------share activity or program detail in social media  ---------------------------------------------------------

  genericSocialShare() {

 this.shareUrl=`${this.shareUrlSocial}program/detail/${this.selectedProgramId}`;
 console.log('share url ',this.shareUrl)
//  this.metaTagService.updateTag(
//   { property: 'og:url', content: this.shareUrl  },
// );
    // switch (provider) {
    //   case 'facebook': {
    //     this.url = `https://www.${provider}.com/sharer/sharer.php?u=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
    //     window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
    //     return true;
    //   }
    //   case 'email': {
    //     this.url = `mailto:?subject=wondrfly&amp;body=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
    //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
    //     return true;
    //   }
    //   case 'whatsapp': {
    //     this.url = `https://api.${provider}.com/send?text=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
    //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
    //     return true;
    //   }
    //   case 'messenger': {
    //     this.url = `https://fb-messenger://share/?link=${encodeURIComponent(this.baseUrl)}&app_id=123456789`;
    //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
    //     return true;
    //   }
    //   case 'copylink': {
    //     this.url = `${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;

    //   }

    // }
  }

  signUpModal() {
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        console.log('timerrrrrr')
        window.document.getElementById("modal1").click();
      }, 1000000);
    }
  }


// -------------------------delete child----------------------------
deleteChild(data) {
  this.apiservice.deleteChild(data.id).subscribe((res: any) => {
    if (res.isSuccess) {
      this.getChildren();
    }
  });
}
searchCategory(key){
  this.apiservice.searchCategory(key).subscribe((res:any)=>{
this.categoriesBySearch = res.data;
  })
}
providerSearch(key){
  this.apiservice.searchUsers(key,'provider').subscribe((res:any)=>{
    this.providersBySearch = res.data;
  })
}
getProviderById(id) {
  console.log('id',id)
  this.apiservice.getUserById(id).subscribe((res: any) => {
    this.user = res.data;
// let rating = 0;
//       if( this.user.rating.facebook){
//         rating = this.user.rating.facebook;
//       }

//       if( this.user.rating.google){
//         rating = this.user.rating.google;
//       }

//       if( this.user.rating.yelp){
//         rating = this.user.rating.yelp;
//       }

//       if( this.user.rating.facebook && this.user.rating.google){
//         rating = (this.user.rating.facebook + this.user.rating.google) / 2;
//       }

//       if( this.user.rating.google && this.user.rating.yelp){
//         rating = (this.user.rating.google + this.user.rating.yelp) / 2;
//       }

//       if( this.user.rating.facebook && this.user.rating.yelp){
//         rating = (this.user.rating.facebook + this.user.rating.yelp) / 2;
//       }

//       if( this.user.rating.facebook && this.user.rating.google && this.user.rating.yelp){
//         rating = (this.user.rating.facebook + this.user.rating.google + this.user.rating.yelp) / 3;
//       }
    // this.totalRating = parseFloat(String(rating)).toFixed(1)
  });
}
goToProviderProfile(provider) {
var providerName = provider.firstName;
  providerName = providerName.toLowerCase();
  providerName = providerName.replace(/ /g,"-");
  providerName = providerName.replace(/\?/g,"-");
    this.router.navigate(['/program-provider', providerName, provider._id]);
}
  ngAfterViewInit() {
    this.signUpModal()
  }
  ngOnDestroy() {
    window.document.getElementById("close_modal").click();
    // window.document.getElementById("close_morefilter").click();
    window.document.getElementById("close_sharemodal").click();
  }

   // ---------------------------------navigate to program detail page -------------------------------------------
getRating(program){
if(program.userId==''|| program.userId==undefined || !program.userId){ program.userId=program.user }
  this.apiservice.getUserRating(program.userId).subscribe((res:any) => {
     this.rating = res
     this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)

     console.log('ratinggggggggggggg', res)
   });
 }

 //----------------------------------------search history get ---------------------------------------------------------
 getTopRated() {
  this.showReset = true;
  this.isTopFilter= true
  if(this.isTopFilterCheckBox == true){
    this.apiservice.getTopRated().subscribe((res: any) => {
      this.programs = res
      console.log('get getTopRated', res);

    });
  }
    else if(this.isTopFilterCheckBox ==!true){
      this.showReset=true
      this.resetFilter();
  }
 }
}


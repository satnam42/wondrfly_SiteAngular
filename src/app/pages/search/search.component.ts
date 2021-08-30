import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Category, Child, User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { MapTheme } from 'src/app/core/common/map-theme';
import { environment } from 'src/environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/guitar.png';
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
  filterData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  locations = [];
  categories = new Category;
  categoriesBySearch : any = new Category;
  isActive: boolean=false
  providersBySearch : any= new User;
  userData: any = {};
  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 20;
  programs: any=[];
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
  shareUrlSocial = environment.baseUrl;
  baseUrl= environment.baseUrl;
  selectedProgram: any;
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
  selectedCat: any;
  selectedSubCategories:any = [];
  catData: any;
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    public mapTheme: MapTheme,
    private ngZone: NgZone,
    private toast: ToastrService,
    private titleService: Title,
    private metaTagService: Meta,
  ) {
    this.filterData = dataservice.getOption()
    if(this.filterData){
    if (this.filterData.categoryId) {
      console.log('this.filterData.categoryId', this.filterData)
      this.categoryId = this.filterData.categoryId
      this.activityName = this.filterData.activityName
    }
    if(this.filterData.subcatId ){
      console.log('this.filterData.subcatId',this.filterData)
     this.selectedSubCategories[0]=this.filterData.subcatId;
    }
  }
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
    this.metaTagService.addTag(
      { name: 'keywords', content: 'kid friendly search,kids activities search, kids programs search'}
    ); 

    window.scroll(0, 0);
    if (this.categoryId) {
      this.isCategoryFilter = true
      this.filterByCategory(this.categoryId)
           this.showReset =true
           }
           else {
               if (this.activityName) {
                 this.filterByNameDate()
               }
          else if(this.selectedSubCategories.length){
               this.programBySubCategoryIds()
            }
       else {
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
    this.apiservice.programByLatLng(this.lat, this.lng).subscribe((res:any) => {
      this.showReset = true;
      console.log('programs', res);
      this.programs = res;
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

  }
 
  


  resetFilter() {
    this.activityName = ''
    this.showReset = false;
    this.isOpenFilter = false;
    this.isTypeFilter=false
    this.categoryId=''
    this.isOnline=false;
    this.isDaysFilter=false
    this.isInPerson=true
    this.isTimeFilter = false;
    this.isSavedFilter = false;
    this.isTopFilterCheckBox=false
    this.isTopFilter= false;
    this.isAgeFilter = false;
    this.isDateFilter = false;
    this.selectedSubCategories=[];
    this.isPriceFilter = false;
    this.isCategoryFilter = false;
    this.maxAge = 12;
    this.minAge = 3;
    this.pageNo = 1;
    this.pageSize = 20;
    this.getPublishedProgram();
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

  getPublishedProgram() {
    this.activityName = ''
    this.showReset = false
      this.ngxLoader.start()
      this.apiservice.getPublishedProgram(this.pageNo, this.pageSize, 'published').subscribe((res:any) => {
        this.ngxLoader.stop()
          this.programs = res.items;
          if(!this.selectedSubCategories.length && !this.categoryId){
          this.isScrol = true;
          }
      });
    this.ngxLoader.stop()
  }
 

  // ---------------------------------------------get categories-------------------------------------
  getCategory() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res
      this.catData = this.categories
      console.log('categories', this.categories)
    })
  }

  // ---------------------------------------------get subCateById-------------------------------------
  getSubCateById(cat){
    this.categoryId = cat.id
    this.selectedCat= cat.id
    this.selectedSubCategories=[]
    this.apiservice.getTagByCategoryId(this.selectedCat).subscribe((res: any) => {
      this.subCats = res.data
    })
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
    this.pageSize += 20;

      if (this.showReset) {
        if (this.activityName) {
          this.filterByNameDate()
        }else if(!this.selectedSubCategories.length && !this.categoryId.length){
            this.programFilter()
        }
      }
       else {
            this.getPublishedProgram()
            }
}



  getFav(id,toggle) {
    console.log('toggle',toggle)
if(toggle){
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
  }

  filterByCategory(id) {
    window.scroll(0,0)
    this.categoryId = id
    var filter = `categoryId=${this.categoryId}`
    this.ngxLoader.start()
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
    this.ngxLoader.stop()
      console.log('response', res);
      if (res.isSuccess) {
        this.programs = res.data;
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
    if (this.activityName) {
      this.apiservice.activityByNameDate(this.activityName).subscribe((res: any) => {
        console.log('filterbyNameDate', res)
        this.ngxLoader.stop();
        this.programs = res.data
        this.showReset = true
      });
      this.ngxLoader.stop();
    }
  }

  programFilter() {
    console.log('selected cat id', this.selectedSubCategories)
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "YYYY-MM-DD HH:mm:ss"
    this.activityName = ''
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
console.log('this.timeSession>>>>>>>>>',this.timeSession)
switch(this.timeSession){
  case 'early-morning':{
  this.fromTime ='2019-01-01T06:00:00.000Z';
  this.toTime = '2050-01-01T09:00:00.000Z';
  break;
  }
    case 'morning':{
      this.fromTime ='2019-01-01T09:00:00.000Z';
  this.toTime = '2050-01-01T12:00:00.000Z';
  break;
    }
      case 'afternoon':{
        this.fromTime ='2019-01-01T12:00:00.000Z';
        this.toTime = '2050-01-01T15:00:00.000Z';
  break;
      }
        case 'late-afternoon':{
          this.fromTime ='2019-01-01T15:00:00.000Z';
          this.toTime = '2050-01-01T18:00:00.000Z';
  break;
        }
          case 'evening':{
            this.fromTime ='2019-01-01T18:00:00.000Z';
            this.toTime = '2050-01-01T21:00:00.000Z';
  break;
          }
          default: {
            this.fromTime ='2019-01-01T00:00:00.000Z';
  this.toTime = '2050-01-01T23:59:00.000Z';
          }
}
    console.log('time session>>>>>>>>>',this.timeSession)
    var filter = ``
    from = this.fromTime;
    to = this.toTime;
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
    this.ngxLoader.start()
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      this.ngxLoader.stop()
      console.log('filter response', res);
      if (res.isSuccess) {
        this.isTopFilterCheckBox=false
        this.programs = res.data;
        this.isScrol = true;
      }
    });
  }

   // ---------------------------------------------getinpersonOrVirtual------------------------------
  inpersonOrVirtual(e){
    var filter=``
    filter = `inpersonOrVirtual=${e}`
    this.ngxLoader.start()
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      this.ngxLoader.stop()
      console.log('inpersonVirtual response', res);
      if (res.isSuccess) {
        this.showReset = true;
        this.isTopFilterCheckBox=false
        this.programs = res.data;
      }
    });
  }

  signUpModal() {
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        console.log('timerrrrrr')
        window.document.getElementById("modal1").click();
      }, 1000000);
    }
  }

searchCategory(key){
  this.apiservice.searchTag(key).subscribe((res:any)=>{
this.categoriesBySearch = res;
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
   });
 }

 //----------------------------------------search history get ---------------------------------------------------------
 getTopRated() {
  this.categoryId=''
  this.showReset = true;
  if(this.isTopFilterCheckBox == true){
    this.ngxLoader.start()
    this.apiservice.getTopRated().subscribe((res: any) => {
      this.ngxLoader.stop()
      this.programs = res
    });
  }
    else if(this.isTopFilterCheckBox ==!true){
      this.showReset=true
      this.resetFilter();
      this.ngxLoader.stop()
  }
  this.ngxLoader.stop()
 }

 updateCheckedSubCategories(i, event) {
   this.categoryId=''
  this.subCats[i].checked = event.target.checked;
  if(this.subCats[i].checked){
    this.selectedSubCategories.push(this.subCats[i]._id);
    console.log(this.selectedSubCategories)
  }
  else{
    const index = this.selectedSubCategories.indexOf(this.subCats[i]._id);

    if (index >= 0) {
      this.selectedSubCategories.splice(index, 1);
      console.log(this.selectedSubCategories)
    }
  }
}

// / ---------------------------------------------get programs by sub category ids--------------------------------
   programBySubCategoryIds(){
     if(this.categoryId.length){
      this.filterByCategory(this.categoryId)
    }
    else{
    this.programs=[]
    let filter = ``;
    let i = 1;
    let id;
    console.log(this.selectedSubCategories)
   for(let catId of this.selectedSubCategories) {
     if(i<2){
      id =  `subId${i}=${catId}`
     }
     else{id =  `&subId${i}=${catId}`
    }
      filter+=id;
      i++;
     };
     console.log(filter)
     if(i<=5){
       this.ngxLoader.start()
    this.apiservice.programBySubCategoryIds(filter,1,100).subscribe((res: any) => {
      this.ngxLoader.stop()
      this.showReset = true;
      this.programs = res.data
      console.log('programBySubCategoryIds', res);
      this.suggestedSubCategories(this.selectedSubCategories[0])
    })
  }else { this.toast.error( '', 'You Selected More Than 5 SubCategories')}
}
}


  // ---------------------suggested sub categories by sub catids -----------------------
  suggestedSubCategories(id){
    window.scroll(0,0)
   this.apiservice.getSuggestedCategory(id).subscribe((res: any) => {
     this.suggested = res;
     if(res.isSuccess==false){
       this.suggested=[]
     }
     console.log('suggested subcategories', res);
   });
 }
}

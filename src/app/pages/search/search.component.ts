import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { Category, Child, User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { JoyrideService } from 'ngx-joyride';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/guitar.png';
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
  filterData: any = {}
  locationData: any = {}
  favPrograms: any;
  isMap: boolean = true;
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
  baseUrl = environment.baseUrl;
  selectedProgram: any;
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
  fakeLoaderData = [1, 2, 3, 4, 5]
  constructor(
    private router: Router,
    private apiservice: ApiService,
    // private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    private ngZone: NgZone,
    private toast: ToastrService,
    private titleService: Title,
    private metaTagService: Meta,
    private joyride: JoyrideService
  ) {
    // this.locationData = dataservice.getLocation()
    // console.log('this.locationData', this.locationData)
    // if(this.locationData){
    //   this.contentLoaded=true;
    //   if (this.locationData.lat && this.locationData.lng) {
    //     this.latt =this.locationData.lat
    //     this.lngg= this.locationData.lng
    //   }
    // }
    this.filterData = dataservice.getOption()
    if (this.filterData) {
       if (this.filterData.subcatId || this.filterData.categoryId) {
        console.log('this.filterData.categoryId', this.filterData)
        console.log('this.filterData.subcatId', this.filterData)
        this.categoryId = this.filterData.categoryId
        this.selectedSubCategories[0] = this.filterData.subcatId;
        this.searchedSubCategory = this.filterData.searchedCategoryKey
        this.programFilter()
      }
      else if (this.filterData.activityName) {
        this.activityName = this.filterData.activityName
        this.filterByNameDate()
      }
    }
    else {
      this.getPublishedProgram()
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

  startTour() {
    if (!localStorage.getItem('tr')) {
      this.joyride.startTour({ steps: ['firstStep', 'secondStep0', 'thirdStep0'] });
      localStorage.setItem('tr', '1')
    }
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
      this.selectedDays.push(day)
      console.log(this.selectedDays)
    } else {
      this.selectedDays.splice(day, -1)
      let el = this.selectedDays.find(itm => itm === day);
      if (el) this.selectedDays.splice(this.selectedDays.indexOf(el), 1);
      console.log(this.selectedDays)
    }
  }
  onProgramTypeChange(indx: number, type: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedProgramTypes.push(type)
      console.log(this.selectedProgramTypes)
    } else {
      this.selectedProgramTypes.splice(type, -1)
      let el = this.selectedProgramTypes.find(itm => itm === type);
      if (el) this.selectedProgramTypes.splice(this.selectedProgramTypes.indexOf(el), 1);
      console.log(this.selectedProgramTypes)
    }
  }
  onProgramTimeChange(indx: number, time: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedProgramTime.push(time)
      console.log(this.selectedProgramTime)
    } else {
      this.selectedProgramTime.splice(time, -1)
      let el = this.selectedProgramTime.find(itm => itm === time);
      if (el) this.selectedProgramTime.splice(this.selectedProgramTime.indexOf(el), 1);
      console.log(this.selectedProgramTime)
    }
  }
  onProgramsSubCategoryChange(i, event) {
    this.categoryId = ''
    this.subCats[i].checked = event.target.checked;
    if (this.subCats[i].checked) {
      this.searchedSubCategory=this.subCats[i].name;
      this.selectedSubCategories.push(this.subCats[i]._id);
      console.log(this.selectedSubCategories)
    }
    else {
      const index = this.selectedSubCategories.indexOf(this.subCats[i]._id);

      if (index >= 0) {
        this.selectedSubCategories.splice(index, 1);
        console.log(this.selectedSubCategories)
      }
    }
  }



  @ViewChildren("types") types: QueryList<ElementRef>;
  clearProgramTypes() {
    this.selectedProgramTypes = []
    this.types.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.programFilter()
  }

  @ViewChildren("days") days: QueryList<ElementRef>;
  clearProgramDays() {
    this.selectedDays = []
    this.days.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.programFilter()
  }
  @ViewChildren("times") times: QueryList<ElementRef>;
  clearProgramTime() {
    this.selectedProgramTime = []
    this.times.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.programFilter()
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.startTour()
    console.log('latt', this.latt);
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
          this.zoom = 14;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat, this.lng)
          // this.getAddress(this.lat, this.lng);
          this.programByLatLng();
        });
      } this.geoCoder = new google.maps.Geocoder;
    });
  }

  programByLatLng() {
    this.apiservice.programByLatLng(this.lat, this.lng).subscribe((res: any) => {
      this.showReset = true;
      console.log('latlong', res);
      this.programs = res;
    });
    this.locationData = ''
    this.dataservice.setLocation(this.locationData)
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

  onScroll() {
    if (this.isScrol) {
      this.isScrol = false;
      this.loadMore();
    }
    if (!this.isLogin) {
      setTimeout(() => {
        this.isBetaPopUp = true;
      }, 1000);
    }
  }

  getPublishedProgram() {
    this.activityName = ''
    this.showReset = false
    // this.ngxLoader.start()
    this.contentLoaded = false;
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe((res: any) => {
      // this.ngxLoader.stop()
      this.contentLoaded = true;
      this.programs = res.items;
      console.log(this.programs, 'response program list')
      if (!this.selectedSubCategories.length && !this.categoryId) {
        this.isScrol = true;
      }
    });
    this.contentLoaded = true;
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
    this.searchedSubCategory =cat.name
    this.apiservice.getTagByCategoryId(cat.id).subscribe((res: any) => {
      this.subCats = res.data
      this.subCats = this.subCats.filter((item) => item.isActivated === true);
      console.log(this.subCats)
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
    if (this.categoryId || this.selectedSubCategories.length) {
      this.programFilter()
    } else if(this.activityName)  {
      this.filterByNameDate()
    }
    else{
      this.programFilter()
    }
  }


  filterByNameDate() {
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

    this.contentLoaded = false;
    this.apiservice.activityByNameDate(this.activityName).subscribe((res: any) => {
      console.log('filterbyNameDate', res)
      this.contentLoaded = true;
      this.programs = res.data
      this.showReset = true
      this.searchedSubCategory = this.activityName;
    });
    this.contentLoaded = true;
  }

  programFilter() {
    this.isTimeFilter = false;
    this.isDaysFilter = false;
    this.isTopFilter = false;
    this.isTypeFilter = false;
    this.isCategoryFilter = false;
    if (this.categoryId || this.selectedDays.length || this.selectedProgramTypes.length || this.selectedSubCategories.length || this.selectedProgramTime.length || this.isOnline || this.isInPerson || this.isDateFilter || this.isPriceFilter || this.isAgeFilter) {
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
      if (this.isOnline) {
        inpersonOrVirtual = 'online'
      }
      else if (this.isInPerson) {
        inpersonOrVirtual = 'inperson'
      }
      else {
        inpersonOrVirtual = ''
      }
      console.log('selected cat id', this.selectedSubCategories)
      const dateFormat = "YYYY-MM-DD";
      this.fromDate = moment(this.fromDate).format(dateFormat);
      this.toDate = moment(this.toDate).format(dateFormat);
      console.log('filter>>>>>>>>>>>>', filter)
      this.contentLoaded = false;

      filter = `time=${times}&categoryId=${categoryId}&tagsIds=${tags}&type=${types}&inpersonOrVirtual=${inpersonOrVirtual}&day=${days}`
      if (this.isDateFilter) {
        filter += `&fromDate=${this.fromDate}&toDate=${this.toDate}`
      }
      if (this.isPriceFilter) {
        filter += `&priceFrom=${this.minPrice}&priceTo=${this.maxPrice}`
      }
      if (this.isAgeFilter) {
        filter += `&ageFrom=${this.minAge}&ageTo=${this.maxAge}`
      }
      console.log('filters query ', filter)
      this.apiservice.programFilter(filter, this.pageNo, 200).subscribe((res: any) => {
        this.showReset = true
        console.log('filter response', res);
        this.contentLoaded = true;
        if (res.isSuccess) {
          this.isTopFilterCheckBox = false
          this.programs = res.data;
          this.isScrol = true;
          this.contentLoaded = true;
        }
      });
    }
    else {
      this.isTopFilterCheckBox = false
      this.getPublishedProgram();
    }
  };

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
    console.log('id', id)
    this.apiservice.getUserById(id).subscribe((res: any) => {
      this.user = res.data;
    });
  }
  goToProviderProfile(provider) {
    var providerName = provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g, "-");
    providerName = providerName.replace(/\?/g, "-");
    this.router.navigate(['/program-provider', providerName, provider._id]);
  }

  ngOnDestroy() {
    window.document.getElementById("close_modal").click();
    // window.document.getElementById("close_morefilter").click();
    window.document.getElementById("close_sharemodal").click();

  }

  // ---------------------------------navigate to program detail page -------------------------------------------
  getRating(program) {
    if (program.userId == '' || program.userId == undefined || !program.userId) { program.userId = program.user }
    this.apiservice.getUserRating(program.userId).subscribe((res: any) => {
      this.rating = res
      this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
    });
  }

  //----------------------------------------search history get ---------------------------------------------------------
  getTopRated() {
    this.contentLoaded = false
    this.searchedSubCategory='',
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
    this.contentLoaded = false;
    this.apiservice.getSuggestedCategory(id).subscribe((res: any) => {
      this.contentLoaded =true
      console.log(res, 'ressssss suggested')
      this.suggested = res.filter(item => item.id !== id)
      // this.searchedSubCategory = this.suggested[0].name
      if (res.isSuccess === false) {
        this.suggested = []
      }
    });
    this.contentLoaded =true
    this.showReset = true;
  }

  // ----------------------------------exploreModal functionality--------------------------------------
  exploreModal() {
    if (localStorage.getItem("token") && !localStorage.getItem('em')) {
      setTimeout(() => {
        console.log('timerrrrrr')
        window.document.getElementById("exploreModal").click();
        localStorage.setItem('em', '1')
      });
    }
  }
  removeRecentSearches(type, indx) {
    switch (type) {
      case 'days': {
        console.log(this.days, 'days event')

        this.days.forEach((element) => {
          console.log(element, 'element')
          if (element.nativeElement.defaultValue === this.selectedDays[indx]) {
            this.selectedDays.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
      }
      case 'times': {
        this.times.forEach((element) => {
          console.log(element)
          if (element.nativeElement.value === this.selectedProgramTime[indx]) {
            this.selectedProgramTime.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
      }
      case 'types': {
        this.types.forEach((element) => {
          console.log(element)
          if (element.nativeElement.value === this.selectedProgramTypes[indx]) {
            this.selectedProgramTypes.splice(indx, 1);
            element.nativeElement.checked = false;
          }
        });
      }
    }
    this.programFilter();

  }

  ngAfterViewInit() {
    this.exploreModal()
  }
}

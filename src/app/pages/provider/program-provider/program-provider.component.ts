import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup } from '@angular/forms';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Category, Program, User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
import { Globals } from 'src/app/core/common/imageLoader';
import * as moment from 'moment';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-program-provider',
  templateUrl: './program-provider.component.html',
  styleUrls: ['./program-provider.component.css']
})
export class ProgramProviderComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/guitar.png';
  baseUrl = environment.baseUrl;
  isScrol: boolean = true;
  pageNo = 1;
  pageSize = 20;
  isGenOverview = true;
  isPeople = false;
  isActivities = false;
  peopleClass = '';
  activityClass = '';
  parentRole: boolean = false;
  overviewClass = 'active';
  markerUrl = 'assets/location.svg'
  userUpdateForm: FormGroup;
  programs: any = [];
  message: string = 'Updated Successfully';
  claimMsg: string = 'Claimed successfully';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;

  isLogin = false;
  userData: any = {};
  program = new Program;
  user = new User;
  rating: any;
  listView:boolean= true;
  updateResponse: any = {};
  formData = new FormData();
  fileData: File = null;
  msg: string;
  usersData: any = {};
  badgeList: any = [];
  badgesList: any = [];
  badges: any = [];
  userResponse: any
  skills: any = [];
  // ---------------autucomplete-------------
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  categoryIds: [] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keyword = 'name';
  tags: any = [];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  totalRating: any = '';
  isRating = false;
  health_safety = [
    { name: 'Cleaning Protocol', img: 'assets/spray-bottle.svg', status: '' },
    { name: 'Social Distancing', img: 'assets/keep-distance.svg', status: '' },
    { name: 'Temperature Screening', img: 'assets/thermometer.svg', status: '' },
    { name: 'Virtual Training and Class Options', img: 'assets/Groups.svg', status: '' },
    { name: 'Intensive Air Filtration', img: 'assets/air-filter.svg', status: '' },
    { name: 'Online Class Reservation', img: 'assets/reservation.svg', status: '' },
  ]
  title = 'Top Classes for Kids by Best Online Provider - Wondrfly '
  @ViewChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;
  previous;
  userId=''
  scrollToActivities = '';

  //  start copied from search page 
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
  providerProgram: any = [];
  key: string = '';
  providerRole: boolean = false;
  favProgramRes: any;
  searchKey = '';
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
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  shareUrlSocial = environment.baseUrl;
  selectedProgram: any;
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
  //  end copied from search page
  constructor(private router: Router,
    private apiservice: ApiService,
    private auth: AuthsService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private dataService: DataService,
    public globalFunc: Globals) {

    this.activatedRoute.params.subscribe(params => {
      this.user.id = params['id'];
    });

    this.userData = auth.currentUser()
    if (this.userData) {
      this.userId = this.userData.id
      this.isLogin = true;
    }
  }
  onGenOverview() {
    window.scroll(0, 0);
    this.peopleClass = ''; this.activityClass = ''; this.overviewClass = 'active';
    this.isGenOverview = true; this.isPeople = false; this.isActivities = false;
  }
  onPeople() {
    window.scroll(0, 0);
    this.peopleClass = 'active'; this.activityClass = ''; this.overviewClass = '';
    this.isGenOverview = false; this.isPeople = true; this.isActivities = false;
  }
  onActivities(id) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth',block: 'start'});
    // window.scroll(0, 0);
    // this.peopleClass = ''; this.activityClass = 'active'; this.overviewClass = '';
    // this.isGenOverview = false; this.isPeople = false; this.isActivities = true
    // this.getProviderProgram()
  }

  getProviderById() {
    this.ngxLoader.start();
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
      for (let health of this.user.healthAndSafety) {
        if (health.socialDistancing) {
          this.health_safety[1].status = 'active';
        }
        else if (health.cleaningProtocol) { this.health_safety[0].status = 'active'; }
        else if (health.temperatureScreening) {
          this.health_safety[2].status = 'active';
        }
        else if (health.virtualTraining) {
          this.health_safety[3].status = 'active';
        }
        else if (health.classReservation) {
          this.health_safety[5].status = 'active';
        }
        else if (health.airFiltration) {
          this.health_safety[4].status = 'active';
        }
      } this.getProviderProgram();
      this.getRating()

    });
    this.ngxLoader.stop();
    this.parentAnalyticAction()
  }
  parentAnalyticAction(){
    this.apiservice.parentAnalytics('provider',this.userId,this.user.id).subscribe((res: any) => {
    });
  }
  // ---------------------------------navigate to program detail page -------------------------------------------
  getRating() {
    this.apiservice.getUserRating(this.user.id).subscribe((res: any) => {
      this.rating = res
      this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
    });
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


  getProviderProgram = async () => {
    await this.apiservice.getProgramByProvider(this.user.id, this.pageNo, 200).subscribe((res) => {
      this.programs = res
    });
  }


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


  ngOnInit() {
    this.getProviderById()
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Looking for approved and registered online kids activities providers in the New Jersey? Contact to Wondrfly for best kids classes. Sign up now! " }
    );
    // this.getBadges();
    this.scrollToActivities = this.dataService.getScrollToActivities()
    if(this.scrollToActivities=='activities'){
      this.dataService.setScrollToActivities('')
     this.onActivities('#ActivitiesList')
    }
    else{
      window.scroll(0,0)
    }
  }
  ngOnDestroy() {
window.scroll(0,0)
  }
  // getBadges() {
  //   this.apiservice.badgeList().subscribe(res => {
  //     this.badges = res;
  //     this.badgesList = this.badges.data;
  //     this.badgesList.reverse();
  //   });
  // }

  // ----------------------------------------add action-------------------------------------------
  addAction(programId) {
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

  // ---------------------------------navigate to program detail page -------------------------------------------
  goToProgramDetail(data) {
    if (this.parentRole) {
      this.addAction(data._id);
    }
    data.name = data.name.replace(/ /g, "-");
    this.router.navigate(['program', data.name, data._id]);
  }

  setSubCategoryId(data) {

    let filterData: any = {
      subcatId: data._id,
      categoryId: '',
      activityName: '',
      searchedCategoryKey: data.name,
      lat: '',
      lng: '',

    }
    this.dataService.setOption(filterData)
    this.router.navigate(['/search'])

  }
  centerChange(e) {
  }


  // start copied from search page
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
      this.apiservice.programFilter(filter, 1, 100).subscribe((res: any) => {
        this.showReset = true
        if (res.isSuccess) {
          // this.isTopFilterCheckBox = false
          this.programs = res.data;
          // if (!this.providerProgram.length) {
          //   this.isLoaded = true
          // }
          // if (this.providerProgram.length) {
          //   this.providerProgram[0].collapsed = true
          // }
          // if (this.providerProgram.length == 2) {MN JKBB
          //   this.providerProgram[1].collapsed = true
          // }
          // else if (this.providerProgram.length > 2) {
          //   this.providerProgram[1].collapsed = true
          //   this.providerProgram[2].collapsed = true
          // }
          // if (categoryId || this.selectedSubCategories.length) {
          //   const sum = this.providerProgram.reduce((accumulator, object) => {
          //     return accumulator + object.programs.length;
          //   }, 0);
          //   this.activitiesCount = sum
          // }
        }
        this.ngxLoader.stop()
      });
    }
    else {
      this.pageNo = 1
      this.programs = []
      this.isTopFilterCheckBox = false
      this.getProviderProgram();
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
    // end copied from search page
}

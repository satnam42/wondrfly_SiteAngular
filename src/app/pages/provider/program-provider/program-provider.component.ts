import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup } from '@angular/forms';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Program, User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
import { Globals } from 'src/app/core/common/imageLoader';

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
    // this.ngxLoader.stop();
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
     this.onActivities('#ActivitiesList')
    }
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
}

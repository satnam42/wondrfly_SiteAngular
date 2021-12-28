import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../models";
import { AuthsService } from "../../services/auths.service";
import { ApiService } from "../../services/api.service.service";
import { UserDataService } from "../../services/user-data.service";
import { Globals } from "../../common/imageLoader";
import { LocalStorageService } from "../../services";
import { DataService } from "../../services/dataservice.service ";
import { ToastrService } from "ngx-toastr";
import { MapsAPILoader } from "@agm/core";
import * as moment from "moment";

declare const $: any;
@Component({
  selector: "app-header",
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  user = new User();
  routeName: string;
  isToggle: boolean;
  profileClass: string = "active";
  programClass: string = "";
  settingClass: string = "";
  insightClass: string = "";
  helpClass: string = "";
  forumClass: string = "";
  chatClass: string = "";
  lat:string;
  lng:string
  filterData: any = {
    subcatId: '',
    categoryId : '',
    activityName: '',
    searchedCategoryKey:'',
    lat:'',
    lng:'',
  };
  locationData: any = {
    lat: '',
    lng:'',
  }

  initialUrl: any;
  feedbackData: any = {
    id: "",
    feedback: "",
  };
  logoPosition = false;
  searchBar = false;
  notification: any;
  profileProgressResponse: any;
  progressBarValue: any;
  profileProgress: string = "";
  message: string = "Please Login First!";
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  categoriesBySearch: any;
  providersBySearch: any;
  zoom = 14;
  address: string;
  private geoCoder;
  todayNotifications=[];
  earlierNotifications=[];
  newNotifications:any;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef;  gitBoxImage='assets/gift-box.svg';
  constructor(
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private userdataservice: UserDataService,
    public imageLoader: Globals,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dataservice: DataService,
    public store: LocalStorageService
  ) {
    this.user = this.auth.currentUser();
    this.auth.userChanges.subscribe((user) => (this.user = user));
    this.routeName = this.router.url;
    if (this.routeName === "/search") {
      this.logoPosition = true;
    }
    if (this.routeName === "/invite") {
      this.gitBoxImage = 'assets/invite-open.svg';
    }
    // if(this.routeName === '/search'|| this.routeName === '/'){ this.searchBar=true}
    if( this.routeName === '/' || this.routeName === '/parent/my-wondrfly' || this.routeName==='/invite'){ this.searchBar=true}

    if (this.user.role === "provider" || this.user.role === "parent") {
      if (this.user.role === "provider") {
        this.isLogin = true;
      } else if (this.user.role === "parent") {
        this.isLogin = false;
      }
    } else {
      auth.logout();
    }
    this.getProfileProgress();
  }
  logo() {
    this.router
    .navigateByUrl("/", { skipLocationChange: true })
    .then(() => this.router.navigate(["parent/my-wondrfly"]));
      // this.router.navigate([""]);
  }
  addProgram() {
    this.router.navigate(["/provider/program/add"]);
  }
  profile() {
    if(this.store.getItem('savedList')=='1'){
      this.store.removeItem('savedList')
    }
    if (this.user.role === "parent") {
      this.router.navigate(["parent/profile", this.user.id]);
    } else if (this.user.role === "provider") {
      this.router.navigate(["provider/profile", this.user.id]);
    } else {
      this.router.navigate(["login"]);
    }
  }
  savedList() {
    if (this.user.role === "parent") {
      this.store.setItem("savedList", "1");
      this.router.navigateByUrl("/", { skipLocationChange: true }).then(() =>
       this.router.navigate(["parent/profile", this.user.id]));
    }
  }
  getProfileProgress() {
    this.apiservice
      .getProfileProgress(this.user.id, this.user.role)
      .subscribe((res: any) => {
        this.profileProgress = res.profileProgress.toString();
        $("#progress").attr("data-percentage", this.profileProgress);
      });
  }
  getUserById(id?) {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
      this.user.notices.notifications.reverse();
      let notifications=[]
      notifications = this.user.notices.notifications.filter(notification=>notification.isRead==false)
      this.newNotifications = notifications.length
      
       this.todayNotifications = this.user.notices.notifications.filter(obj => moment().isSame(obj.createdOn, 'day'));
      console.log('todayNotificaations',this.todayNotifications)
      this.earlierNotifications =  this.user.notices.notifications.filter(obj => !moment().isSame(obj.createdOn, 'day'));
      console.log('earlierNotifications',this.earlierNotifications)
            this.store.setObject('userData', this.user);
      console.log('user',this.user)
      // this.user.notices.notifications = this.user.notices.notifications.filter(notification=>notification.createdOn.getTime() < new Date().getTime())
      // this.todayNotifications = this.user.notices.notifications.filter(notification=>notification.createdOn.getTime() == new Date().getTime())
      // console.log('todayNotifications',this.todayNotifications)
      if (this.user.notificationsOnOff === true) {
        this.isToggle = true;
      }
      // this.auth.setUser(this.user);
    });
  }
  clearAll() {
    this.apiservice
      .clearAllNotifications(this.user.id)
      .subscribe((res: any) => {
        this.notification = res;
        this.getUserById();
        // $("#progress").attr("data-percentage", this.profileProgress);
      });
  }
  deleteNotification(data, indx) {
    this.apiservice.deleteNotification(data).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getUserById();
      }
    });
  }
  readNotification(notification) {
    if(!notification.isRead){
      this.apiservice.readNotification(notification._id).subscribe((res: any) => {
        if (res.isSuccess) {
          this.getUserById();
        }
      });
    }
  
  }
  onOffNotification(id, e) {
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      this.getUserById();
    });
  }

  ngOnInit() {
    this.getUserById();

    if ((this.routeName === "/profile", this.user.id)) {
      this.profileClass = "active";
    }
    if (this.routeName === "/program/list") {
      this.programClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/program/detail") {
      this.programClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/program/add") {
      this.programClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "help") {
      this.helpClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/program/home") {
      this.insightClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/program/setting") {
      this.settingClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/forum/forum-type") {
      this.forumClass = "active";
      this.profileClass = "";
    }
    if (this.routeName === "/chat") {
      this.chatClass = "active";
      this.profileClass = "";
    }

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude
          this.lat = String(place.geometry.location.lat());
          this.lng = String(place.geometry.location.lng());
        });
      });
    });
  }

  ngOnDestroy() {
    window.document.getElementById("close_feedback_modal").click();
  }
  logout() {
    this.auth.logout();
    this.userdataservice.logout();
    localStorage.clear();
    this.router.navigate([""]);
    // window.document.getElementById("open_feedback_modal").click();
  }
  goToInviteList(){
    this.store.setItem('sendInvite','1')
    this.router.navigate(['/parent/profile',this.user.id]);
  }
  submitFeedback() {
    this.feedbackData.id = this.user.id;
    this.apiservice.sendFeedback(this.feedbackData).subscribe((res: any) => {
      if (res.isSuccess === true) {
        // this.toastr.success("Thank you!");
        this.auth.logout();
        this.userdataservice.logout();
        localStorage.clear();
        this.router.navigate([""]);
      }
    });
  }

  cancelFeedback() {
    this.auth.logout();
    this.userdataservice.logout();
    localStorage.clear();
    this.router.navigate([""]);
  }

  searchSubCategory(key) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.categoriesBySearch = res;
      this.categoriesBySearch.category = this.categoriesBySearch.category.filter((item) => item.isActivated !== false);
      this.categoriesBySearch.tags = this.categoriesBySearch.tags.filter((item) => item.isActivated !== false);
    });
  }

  providerSearch(key) {
    this.apiservice.searchUsers(key, "provider").subscribe((res: any) => {
      if(res.data){
        this.providersBySearch = res.data;
      }
      else{
        this.providersBySearch=[]
      }    });
  }
  searchByLocation() {
    this.filterData.searchedCategoryKey=this.filterData.activityName
    this.filterData.activityName=''
    this.filterData.categoryId = ''
    this.filterData.subcatId= ''
    this.filterData.lat = this.lat
    this.filterData.lng = this.lng
    this.dataservice.setLocation(this.filterData)
    this.router.navigate(['/search']);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }
  searchBySubCategory(id) {
    this.filterData.activityName = '';
    this.filterData.lat=''
    this.filterData.lng=''
    this.filterData.subcatId = id;
    this.dataservice.setOption(this.filterData);
    this.router.navigate(["/search"]);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }

  searchByCategory(id) {
    this.filterData.activityName=''
    this.filterData.subcatId =''
    this.filterData.categoryId = id
    this.filterData.lat=''
    this.filterData.lng=''
    this.dataservice.setOption(this.filterData)
    this.router.navigate(["/search"]);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }  }

  goToProviderProfile(provider) {
    console.log(provider)
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g, "-");
    provider.firstName = provider.firstName.replace(/\?/g, "-");
    this.router.navigate(["/provider/program-provider", provider.firstName, provider._id,
    ]);
  }


  searchActivityByNameDate() {
    this.filterData.categoryId = '';
    this.filterData.lat = '';
    this.filterData.lng = '';
    this.dataservice.setOption(this.filterData);
    this.router.navigate(['/search']);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }

    // Get Current Location Coordinates
    setCurrentLocation() {
      this.mapsAPILoader.load().then(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position:any) => {
            this.zoom = 14;
            this.locationData.lat = position.coords.latitude;
            this.locationData.lng = position.coords.longitude;
            this.dataservice.setLocation(this.locationData)
            this.router.navigate(['/search']);
            if (this.routeName === "/search") {
              this.router
                .navigateByUrl("/", { skipLocationChange: true })
                .then(() => this.router.navigate(["search"]));
            }
            console.log(this.lat,this.lng)
            // this.getAddress(this.lat, this.lng);
          });
        }      this.geoCoder = new google.maps.Geocoder;
      });
    }
}

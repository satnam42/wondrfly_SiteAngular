import { Component, OnInit } from "@angular/core";
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

declare const $: any;
@Component({
  selector: "app-header",
  template: `
    <body>
      <header [ngClass]="{ 'search-header': logoPosition }">
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light header_main">
            <!-- <a class="navbar-brand" href="#">Navbar</a> -->
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="cursor header-logo" (click)="logo()">
                <img
                  *ngIf="!logoPosition"
                  class="header-image"
                  src="assets/logo.png"
                  alt="Logo"
                />
                <img
                  *ngIf="logoPosition"
                  class="header-image-search"
                  src="assets/logo.png"
                  alt="Logo"
                />
              </a>

              <div class="left-searchpd" *ngIf="!searchBar || isLogin">
                <div class="left_search">
                  <div>
                    <form
                      class="banner_form"
                      data-toggle="collapse"
                      href="#dropdownprogram-provider"
                      role="button"
                      aria-expanded="false"
                      aria-controls="dropdownprogram-provider"
                    >
                      <div class="form-group ">
                        <input
                          type="text"
                          autocomplete="off"
                          (keyup)="
                            searchSubCategory(filterData.activityName);
                            providerSearch(filterData.activityName)
                          "
                          [(ngModel)]="filterData.activityName"
                          placeholder="Search Activity..."
                          class="form-control camp_input "
                          name="activityName"
                        />
                      </div>
                      <div class="search-location">
                        <span data-toggle="modal" data-target="#locationModal">
                          <img src="assets/search-location.png"
                        /></span>
                        <input
                          placeholder="Search Location"
                          (keydown.enter)="$event.preventDefault()"
                          autocorrect="off"
                          autocapitalize="off"
                          spellcheck="off"
                          #search
                        />
                      </div>
                      <div class="form-group cursor">
                        <button
                          class="banner_button cursor"
                          type="submit"
                          routerLink="search"
                          (click)="searchActivityByNameDate()"
                        >
                          <img
                            src="assets/search_icon.svg"
                            alt="Search image"
                          />
                        </button>
                      </div>

                      <div
                        class="dropdownprogram"
                        *ngIf="
                          (categoriesBySearch?.length ||
                            providersBySearch?.length) &&
                          filterData.activityName
                        "
                      >
                        <div class="card card-body">
                          <div
                            class="program-list"
                            *ngIf="categoriesBySearch?.length"
                          >
                            <h6
                              (click)="searchBySubCategory(category._id)"
                              *ngFor="
                                let category of categoriesBySearch | slice: 0:4
                              "
                            >
                              {{ category.name }}
                              <span class="search-programlist">
                                <img src="assets/program-search.svg" />
                              </span>
                            </h6>
                          </div>
                          <hr />
                          <div
                            class="provider-list"
                            *ngIf="providersBySearch?.length"
                          >
                            <h5>Providers</h5>
                            <h6
                              (click)="goToProviderProfile(provider)"
                              *ngFor="
                                let provider of providersBySearch | slice: 0:4
                              "
                            >
                              {{ provider.firstName }}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <ul *ngIf="isLogin" class="navbar-nav mr-auto">
                <li class="C">
                  <a
                    class="nav-link cursor"
                    (click)="profile()"
                    [class.active]="profileClass"
                  >
                    <!-- <span class="icon icon-user"></span> -->
                    <span class="icon "
                      ><img src="assets/Profile-icon.svg" alt="Logo"
                    /></span>
                    Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    routerLink="/program/home"
                    [class.active]="insightClass"
                  >
                    <!-- <span class="icon icon-statistics"></span> -->
                    <span class="icon "
                      ><img src="assets/Insights-icon.svg" alt="Logo"
                    /></span>
                    Insights
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    routerLink="/program/list"
                    [class.active]="programClass"
                  >
                    <!-- <span class="icon icon-list"></span> -->

                    <span class="icon "
                      ><img src="assets/Activities-icon.svg" alt="Logo" /></span
                    >Manage Activities
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    routerLink="/program/setting"
                    [class.active]="settingClass"
                  >
                    <!-- <span class="icon icon-gear"></span>  -->
                    <span class="icon "
                      ><img src="assets/Settings-icon.svg" alt="Logo" /></span
                    >Settings
                  </a>
                </li>
                <!-- <li class="nav-item">
              <a class="nav-link cursor" routerLink="/forum/forum-type" [class.active]="forumClass">
                <span class="icon icon-conversation"></span> Forum
              </a>
            </li> -->
                <li class="nav-item">
                  <a class="nav-link cursor" [class.active]="helpClass">
                    <!-- <span class="icon icon-information1"></span>  -->

                    <span class="icon "
                      ><img src="assets/Help-icon.svg" alt="Logo"
                    /></span>
                    Help
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link cursor"
                    data-toggle="modal"
                    data-target="#NotificationModal"
                  >
                    <!-- <span class="icon icon-bell"></span>  -->

                    <span class="icon "
                      ><img src="assets/Notification-icon.svg" alt="Logo"
                    /></span>
                    Notifications
                  </a>
                </li>
              </ul>
              <div
                class="header_right row"
                [ngClass]="{ 'after-nav': logoPosition }"
              >

            <div class="header-lefticons" *ngIf="!isLogin">
                  <a class="share-lefticon cursor">
                    <span class="icon rel"
                      ><img src="assets/gift-box.svg"/>
                      <span class="Button-badge noti">
                        <span>1</span>
                      </span>
                    </span>
                  </a>
                  <a
                    class="noti-lefticon cursor"
                    data-toggle="modal"
                    data-target="#NotificationModal"
                  >
                    <span class="icon rel"
                      ><img src="assets/Notification-icon.svg" alt="Logo" />
                      <span class="Button-badge" *ngIf="user.notices?.count">
                        <span *ngIf="user.notices?.count <= 10">{{
                          user.notices?.count
                        }}</span>
                        <span *ngIf="user.notices?.count > 10">{{ 10 }}+</span>
                      </span>
                    </span>
                  </a>
                  <!-- <a class="share-lefticon cursor" (click)="savedList()">
                    <span class="icon rel"
                      ><img src="assets/bookmark_gray.svg" alt="Logo" />
                    </span>
                  </a> -->
                </div>
                <div class="progress-imagewith">
                  <a
                    class="cursor"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="head_profile">
                      <div class="progress" id="progress">
                        <span class="progress-left">
                          <span class="progress-bar"></span>
                        </span>
                        <span class="progress-right">
                          <span class="progress-bar"></span>
                        </span>
                        <img
                          [src]="user?.avatarImages"
                          (error)="user.avatarImages = 'assets/default_img.png'"
                          alt="Profile image"
                        />
                      </div>
                    </div>
                  </a>
                  <div class="dropdown-menu header-logoutdrop" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item cursor active-head" (click)="profile()"
                        ><img src="assets/Profile.svg" />Profile</a
                      >
                      <a class="dropdown-item cursor active-head"><img src="assets/invites.svg" (click)="goToInviteList()"/>Invites (2)</a
                      >
                      <a class="dropdown-item cursor active-head"><img src="assets/saved-prog.svg"(click)="savedList()" />Saved Activities (3)</a
                      >
                      <a class="dropdown-item cursor active-head"(click)="logout()"><img src="assets/Logout.svg" />Logout</a
                      >
                  </div>

                  <div class="profile-completion">
                    <a class="progress_bar">
                      <div class="progress profile_text" id="progress">
                        <div *ngIf="profileProgress" class="progress-value">
                          Profile Complition {{ profileProgress }}%
                        </div>
                      </div>
                    </a>
                  </div>
                </div>


              </div>
            </div>
          </nav>
        </div>
      </header>
    </body>
    <!--notification Modal -->
    <div
      class="modal fade"
      id="NotificationModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content noti_modal">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" class="icon-close"></span>
          </button>
          <div class="modal-body N_modal1">
            <mat-slide-toggle
              *ngIf="isLogin"
              #toggle
              [(ngModel)]="isToggle"
              (ngModelChange)="onOffNotification(user.id, $event)"
              >ENABLE</mat-slide-toggle
            >
            <div class="heading_alert">
            You have 3 New Notifications
              <span class="three_dots">
                <p class="noti-read">
                  <span><img src="assets/dotshorizontal.png"></span>
                </p>
                <span *ngIf="isLogin" (click)="clearAll()"> clear all </span>
              </span>
            </div>
            <hr class="grey_line" />
            <h6 class="today-heading">Today</h6>
            <div
              class="notification"
              *ngFor="
                let notification of user?.notices.notifications;
                let i = index
              "
            >
            <div class="img-notif">
                <img src="assets/notic1.png">
                <span class="red_dot dots-span"
                  ><svg
                    width="7"
                    height="7"
                    viewBox="0 0 4 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="2" fill="#FA627D" />
                  </svg>
                </span>
            </div>
            <div>
              <div class="noti_description">
                {{ notification.description }}
              </div>
              <div class="noti_heading">
              {{ notification.updatedOn | date: "MMM d,h:mm a" }}
              </div>
            </div>



            </div>

            <hr class="grey_line" />
            <h6 class="today-heading">Earlier</h6>
            <div
              class="notification"
              *ngFor="
                let notification of user?.notices.notifications;
                let i = index
              "
            >
            <div class="img-notif">
                <img src="assets/notic3.png">
                <span class="red_dot dots-span"
                  ><svg
                    width="7"
                    height="7"
                    viewBox="0 0 4 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="2" fill="#FA627D" />
                  </svg>
                </span>
            </div>
            <div>
              <div class="noti_description">
                {{ notification.description }}
              </div>
              <div class="noti_heading">
              {{ notification.updatedOn | date: "MMM d,h:mm a" }}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
                      </div>
    <!-- --------------------------------------------review-modal--------------------------------------------------- -->

    <div
      data-toggle="modal"
      data-target="#review"
      id="open_feedback_modal"
    ></div>
    <div
      class="modal fade verification_modal password"
      id="review"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered review-pop">
        <div class="modal-content popu-ip">
          <button
            type="button"
            class="close"
            id="close_feedback_modal"
            (click)="cancelFeedback()"
            data-dismiss="modal"
            routerLink="/login"
            aria-label="Close"
          >
            <span aria-hidden="true" class="icon-close"></span>
          </button>
          <div class="modal-body">
            <div class="verification_outer">
              <div class="tab_outer">
                <div class="tab-content">
                  <div class="tab-pane active" id="parent" role="tabpanel">
                    <div class="popup_img">
                      <img src="assets/logo.png" />
                    </div>
                    <div class="popup_maintext">
                      How was your browsing
                      <br />
                      experience?
                    </div>
                    <div class="container images-popup">
                      <div class="row">
                        <div
                          class="col-4"
                          (click)="feedbackData.feedback = 'poor'"
                        >
                          <img
                            [ngClass]="{
                              active: feedbackData.feedback === 'poor'
                            }"
                            src="assets/smile1.svg"
                          />
                          <!-- <h6>POOR</h6> -->
                        </div>
                        <div
                          class="col-4"
                          (click)="feedbackData.feedback = 'average'"
                        >
                          <img
                            [ngClass]="{
                              active: feedbackData.feedback === 'average'
                            }"
                            src="assets/smile2.svg"
                          />
                          <!-- <h6 >AVERAGE</h6> -->
                        </div>
                        <div
                          class="col-4"
                          (click)="feedbackData.feedback = 'great'"
                        >
                          <img
                            [ngClass]="{
                              active: feedbackData.feedback === 'great'
                            }"
                            src="assets/smile3.svg"
                          />
                          <!-- <h6>GREAT</h6> -->
                        </div>
                      </div>
                    </div>
                    <div class="pop-upbtn">
                      <div _ngcontent-gvo-c1="" class="input-group-append">
                        <button
                          _ngcontent-gvo-c1=""
                          [disabled]="!feedbackData.feedback"
                          class="Submit_btn"
                          data-dismiss="modal"
                          type="button"
                          (click)="submitFeedback()"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!----------------------------------------- location Modal ------------------------------------------------------->

<div
  class="modal fade verification_modal Location-Modal"
  id="locationModal"
  data-backdrop="static"
  data-keyboard="false"
  tabindex="-1"
  role="dialog"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <button
        type="button"
        class="close"
        id="close_modal"
        data-dismiss="modal"
        aria-label="Close">
        <span aria-hidden="true" class="icon-close"></span>
      </button>
      <div class="modal-body">
        <div class="location-popup">
          <span><img class="logo-img" src="assets/logo.png" /></span>

          <h1>May we access your location? </h1>

          <h2>
            <span><img src="assets/location-search1.png" /></span>
            Help us find the best activities near you.
          </h2>
        </div>

        <div class="sign_in_btn">
          <button class="SignBtn cancel" data-dismiss="modal">Not Now</button>
          <button
          (click)="setCurrentLocation()"
            data-dismiss="modal"
            type="submit"
            class="SignBtn"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
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
  filterData: any = {
    subcatId: "",
    activityName: "",
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
  lat = 40.712776;
  lng = -74.005974;
  zoom = 14;
  address: string;
  private geoCoder;
  constructor(
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private userdataservice: UserDataService,
    public imageLoader: Globals,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private dataservice: DataService,
    public store: LocalStorageService
  ) {
    this.user = this.auth.currentUser();
    this.auth.userChanges.subscribe((user) => (this.user = user));
    this.routeName = this.router.url;
    if (this.routeName === "/search") {
      this.logoPosition = true;
    }
    // if(this.routeName === '/search'|| this.routeName === '/'){ this.searchBar=true}
    if( this.routeName === '/' || this.routeName === '/parent/my-wondrfly'){ this.searchBar=true}

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
  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
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
  }

  ngOnDestroy() {
    window.document.getElementById("close_feedback_modal").click();
  }
  logout() {
    window.document.getElementById("open_feedback_modal").click();
  }
  goToInviteList(){
    this.store.setItem('sendInvite','1')
    this.router.navigate(['/parent/profile',this.user.id]);
  }
  submitFeedback() {
    this.feedbackData.id = this.user.id;
    this.apiservice.sendFeedback(this.feedbackData).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.toastr.success("Thank you!");
        this.auth.logout();
        this.userdataservice.logout();
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    });
  }

  cancelFeedback() {
    this.auth.logout();
    this.userdataservice.logout();
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  searchSubCategory(key) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.categoriesBySearch = res;
    });
  }

  providerSearch(key) {
    this.apiservice.searchUsers(key, "provider").subscribe((res: any) => {
      this.providersBySearch = res.data;
    });
  }

  searchBySubCategory(id) {
    this.filterData.activityName = "";
    this.filterData.subcatId = id;
    this.dataservice.setOption(this.filterData);
    this.router.navigate(["/search"]);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }

  goToProviderProfile(provider) {
    console.log(provider)
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g, "-");
    provider.firstName = provider.firstName.replace(/\?/g, "-");
    this.router.navigate(["/provider/program-provider", provider.firstName, provider._id,
    ]);
  }

  searchActivityByNameDate() {
    this.dataservice.setOption(this.filterData);
    this.router.navigate(["/search"]);
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

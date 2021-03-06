import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../models";
import { AuthsService } from "../../services/auths.service";
import { ApiService } from "../../services/api.service.service";
import { UserDataService } from "../../services/user-data.service";
import { Globals } from "../../common/imageLoader";
import { LocalStorageService } from "../../services";
import { DataService } from "../../services/dataservice.service ";
import { MapsAPILoader } from "@agm/core";
import * as moment from "moment";
import { FormControl } from "@angular/forms";
import { Console } from "console";
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
  lat: string;
  lng: string
  filterData: any = {
    subcatId: '',
    categoryId: '',
    activityName: '',
    searchedCategoryKey: '',
    lat: '',
    lng: '',
  };
  locationData: any = {
    lat: '',
    lng: '',
  }

  searchTerm = new FormControl();
  zoom = 14;
  allData: any = [];

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
  address: string;
  private geoCoder;
  todayNotifications = [];
  earlierNotifications = [];
  newNotifications: any;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef; gitBoxImage = 'assets/gift-box.svg';
  categoryData: any;
  filterArray: any = []
  profileProgressPopup: boolean
  constructor(
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private userdataservice: UserDataService,
    public imageLoader: Globals,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dataservice: DataService,
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
    if (this.routeName === '/' || this.routeName === '/parent/my-wondrfly' || this.routeName === '/invite') { this.searchBar = true }
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
  }
  addProgram() {
    this.router.navigate(["/provider/program/add"]);
  }
  profile() {
    this.store.removeItem('activeList')
    if (this.user.role === "parent") {
      this.router.navigate(["parent/profile", this.user.id]);
      if (this.routeName === "parent/profile", this.user.id) {
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["parent/profile", this.user.id]));
      }
    } else if (this.user.role === "provider") {
      this.router.navigate(["provider/profile", this.user.id]);
    } else {
      this.router.navigate(["login"]);
    }
  }
  savedList() {
    if (this.user.role === "parent") {
      this.store.setItem("activeList", "savedList");
      this.router.navigate(["parent/profile", this.user.id]);
      if (this.routeName === "parent/profile", this.user.id) {
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["parent/profile", this.user.id]));
      }
    }
  }
  getProfileProgress() {
    this.apiservice
      .getProfileProgress(this.user.id, this.user.role)
      .subscribe((res: any) => {
        this.profileProgress = res.profileProgress.toString();
        $("#progress").attr("data-percentage", this.profileProgress);
        if (this.routeName === `/parent/profile/${this.user.id}`) {
          this.profileProgressPopup = false
        } else {
          this.profileProgressPopup = true
        }
      });
  }
  getUserById(id?) {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
      this.user.notices.notifications.reverse();
      let notifications = []
      notifications = this.user.notices.notifications.filter(notification => notification.isRead == false)
      this.newNotifications = notifications.length

      this.todayNotifications = this.user.notices.notifications.filter(obj => moment().isSame(obj.createdOn, 'day'));
      this.earlierNotifications = this.user.notices.notifications.filter(obj => !moment().isSame(obj.createdOn, 'day'));
      this.store.setObject('CurrentUserWondrfly', this.user);
      if (this.user.notificationsOnOff === true) {
        this.isToggle = true;
      }
    });
  }
  clearAll() {
    this.apiservice
      .clearAllNotifications(this.user.id)
      .subscribe((res: any) => {
        this.notification = res;
        this.getUserById();
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
    if (!notification.isRead) {
      this.apiservice.readNotification(notification._id).subscribe((res: any) => {
        if (res.isSuccess) {
          this.getUserById();
        }
      });
    }
  }
  notificationView(data) {
    switch (data.title) {
      case 'update Profile': case 'About Profile': {
        window.document.getElementById("close_notification_modal").click();
        this.store.removeItem('activeList')
        if (this.user.role === "parent") {
          this.router.navigate(["parent/profile", this.user.id]);
          if (this.routeName === "parent/profile", this.user.id) {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(["parent/profile", this.user.id]));
          }
        } else if (this.user.role === "provider") {
          this.router.navigate(["provider/profile", this.user.id]);
        } else {
          this.router.navigate(["login"]);
        }
        break;
      }
      case 'Add child': {
        window.document.getElementById("close_notification_modal").click();
        if (this.user.role === "parent") {
          this.store.setItem("activeList", "kidList");
          this.router.navigate(["parent/profile", this.user.id])
          if (this.routeName === "parent/profile", this.user.id) {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(["parent/profile", this.user.id]));
          }
        }
        break;
      }
      case 'Save Program': case 'unSave Program': {
        window.document.getElementById("close_notification_modal").click();
        if (this.user.role === "parent") {
          this.store.setItem("activeList", "savedList");
          this.router.navigate(["parent/profile", this.user.id])
          if (this.routeName === "parent/profile", this.user.id) {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(["parent/profile", this.user.id]));
          }
        }
        break;
      }
    }
  }
  onOffNotification(id, e) {
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      this.getUserById();
    });
  }
  onTab(e, value) {
    this.searchTerm.setValue(value)
  }
  ngOnInit() {

    this.searchTerm.valueChanges.subscribe((value) => {
      if (value) { this.searchSubCategory(value) } else {
        this.allData = [];
      }
    })
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
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
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

  }
  logout() {
    this.auth.logout();
    this.userdataservice.logout();
    localStorage.clear();
    this.router.navigate([""]);
  }
  goToInviteList() {
    this.store.setItem('sendInvite', '1')
    this.router.navigate(['/parent/profile', this.user.id]);
  }
  submitFeedback() {
    this.feedbackData.id = this.user.id;
    this.apiservice.sendFeedback(this.feedbackData).subscribe((res: any) => {
      if (res.isSuccess === true) {
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
  providerSearch(key) {
    this.apiservice.searchUsers(key, "provider").subscribe((res: any) => {
      if (res.data) {
        this.providersBySearch = res.data;
      }
      else {
        this.providersBySearch = []
      }
    });
  }
  searchByLocation() {
    this.filterData.searchedCategoryKey = this.filterData.activityName
    this.filterData.activityName = ''
    this.filterData.categoryId = ''
    this.filterData.subcatId = ''
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
  searchSubCategory(key) {
    let groupDataAll: any = [
      { label: 'Keywords', data: [] },
      { label: 'Provider', data: [] },
    ]
    if (!key) {
      this.allData = [];
    } else {
      this.apiservice.searchKeywords(key).subscribe((res: any) => {
        this.categoriesBySearch = res.data;
        res.data.map(keyword => { keyword.name = keyword.keywordName })
        groupDataAll[0].data = this.categoriesBySearch;
      });
      this.apiservice.searchUsers(key, "provider").subscribe((res: any) => {
        if (res.isSuccess === true) {
          this.providersBySearch = res.data;
          this.providersBySearch = this.providersBySearch.filter(e => e.isActivated);
          var i;
          for (i = 0; i < this.providersBySearch.length; i++) {
            this.providersBySearch[i].name = this.providersBySearch[i]['firstName'];
            groupDataAll[1].data = this.providersBySearch;
            this.allData = groupDataAll
          }
        }
        else {
          groupDataAll[1].data = []
          this.allData = groupDataAll
        }
      });
    }
  }

  searchByCategory(id) {
    this.filterData.activityName = ''
    this.filterData.subcatId = ''
    this.filterData.categoryId = id
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.dataservice.setOption(this.filterData)
    this.router.navigate(["/search"]);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }

  goToProviderProfile(provider) {
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g, "-");
    provider.firstName = provider.firstName.replace(/\?/g, "-");
    this.router.navigate(["/provider/program-provider", provider.firstName, provider._id,]);
    if (this.routeName === "/provider/program-provider", provider.firstName, provider._id) {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/provider/program-provider", provider.firstName, provider._id]));
    }
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
        navigator.geolocation.getCurrentPosition((position: any) => {
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
        });
      } this.geoCoder = new google.maps.Geocoder;
    });
  }

  selectSearchedOption(data) {
    if (data.role == 'provider') {
      this.filterData.activityName = "";
      data.name = data.name.toLowerCase();
      data.name = data.name.replace(/ /g, "-");
      data.name = data.name.replace(/\?/g, "-");
      this.router.navigate(["/provider/program-provider", data.name, data._id])
      this.router.navigate(["/provider/program-provider", data.name, data._id,]);
      if (this.routeName === "/provider/program-provider", data.name, data._id) {
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/provider/program-provider", data.name, data._id]));
      }
    }
    else {
      let filter = ``
      switch (data.keywordType) {
        case 'category':
          filter = `categoryId=${data.keywordValue[0].category}`
          break;
        case 'subCategory':
          filter = `tagsIds=${data.keywordValue[0].subcategory.toString()}`
          break;
        case 'age':
          filter = `ageFrom=${data.keywordValue[0].from}&ageTo=${data.keywordValue[0].to}`
          break;
        case 'price':
          filter = `priceFrom=${data.keywordValue[0].from}priceTo=${data.keywordValue[0].to}`
          break;
        case 'dates':
          filter = `fromDate=${data.keywordValue[0].from}&toDate=${data.keywordValue[0].to}`
          break;
        case 'type':
          filter = `type=${data.keywordValue[0].type.toString()}`
          break;
        case 'time':
          filter = `time=${data.keywordValue[0].time.toString()}`
          break;
        case 'days':
          filter = `day=${data.keywordValue[0].days.toString()}`
          break;
        case 'format':
          filter = `inpersonOrVirtual=${data.keywordValue[0].format.toString()}`
          break;
        case 'topRated':
          filter = `ratingFrom=${data.keywordValue[0].from}&ratingTo=${data.keywordValue[0].to}`

          break;

      }
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(['/search'], {
          queryParams: {
            filter: filter
          }
        }));

    }

  }
  searchKeyword(txt) {
    //     var stringArray = key.split(" ")
    if (txt) {
      txt += `&parentId=${this.user.id}`
      this.apiservice.searchMultipleKeywords(txt).subscribe((res: any) => {
        const uniqueArry: any = [...new Map(res.data.map((item) => [item["keywordName" && "keywordType"], item])).values()];
        if (uniqueArry) {
          let filter = ``
          for (let data of uniqueArry) {
            switch (data.keywordType) {
              case 'category':
                if (filter) {
                  filter += `&categoryId=${data.keywordValue[0].category}`
                } else {
                  filter += `categoryId=${data.keywordValue[0].category}`
                }
                break;
              case 'subCategory':
                if (filter) {
                  filter += `&tagsIds=${data.keywordValue[0].subcategory.toString()}`
                } else {
                  filter += `tagsIds=${data.keywordValue[0].subcategory.toString()}`

                }
                break;
              case 'age':
                if (filter) {
                  filter += `&ageFrom=${data.keywordValue[0].from}&ageTo=${data.keywordValue[0].to}`
                } else {
                  filter += `ageFrom=${data.keywordValue[0].from}&ageTo=${data.keywordValue[0].to}`
                }
                break;
              case 'price':
                if (filter) {
                  filter += `&priceFrom=${data.keywordValue[0].from}&priceTo=${data.keywordValue[0].to}`
                } else {
                  filter += `priceFrom=${data.keywordValue[0].from}&priceTo=${data.keywordValue[0].to}`
                }
                break;
              case 'dates':
                if (filter) {
                  filter += `&fromDate=${data.keywordValue[0].from}&toDate=${data.keywordValue[0].to}`
                } else {
                  filter += `fromDate=${data.keywordValue[0].from}&toDate=${data.keywordValue[0].to}`
                }
                break;
              case 'type':
                if (filter) {
                  filter += `&type=${data.keywordValue[0].type.toString()}`
                } else {
                  filter += `type=${data.keywordValue[0].type.toString()}`
                }
                break;
              case 'time':
                if (filter) {
                  filter += `&time=${data.keywordValue[0].time.toString()}`
                } else {
                  filter += `time=${data.keywordValue[0].time.toString()}`
                }
                break;
              case 'days':
                if (filter) {
                  filter += `&day=${data.keywordValue[0].days.toString()}`
                } else {
                  filter += `day=${data.keywordValue[0].days.toString()}`
                }
                break;
              case 'format':
                if (filter) {
                  filter += `&inpersonOrVirtual=${data.keywordValue[0].format.toString()}`
                } else {
                  filter += `inpersonOrVirtual=${data.keywordValue[0].format.toString()}`
                }
                break;
              case 'topRated':
                if (filter) {
                  filter += `&ratingFrom=${data.keywordValue[0].from}&ratingTo=${data.keywordValue[0].to}`
                } else {
                  filter += `ratingFrom=${data.keywordValue[0].from}&ratingTo=${data.keywordValue[0].to}`
                }
                break;

            }
          }
          if (filter) {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(['/search'], {
                queryParams: {
                  filter: filter
                }
              }));
          } else {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(['/search'], {
                queryParams: {
                  filter:  `keyword=${txt}`

                }
              }));
          }

        } else {
          this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(['/search'], {
            queryParams: {
              filter:  `keyword=${txt}`

            }
          }));
        }
      })
    }
    else {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(['/search']));
    }
  }
}

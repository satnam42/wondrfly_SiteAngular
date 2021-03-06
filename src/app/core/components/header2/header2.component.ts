import { MapsAPILoader } from "@agm/core";
import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { createCookies } from "../../common/create-cookies";
import { ApiService } from "../../services/api.service.service";
import { DataService } from "../../services/dataservice.service ";

@Component({
  selector: "app-header2",
  template: `
<header [ngClass]="{ 'search-header': logoPosition }">
  <div [ngClass]="logoPosition? 'container-fluid':'container' ">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="cursor header-logo" (click)="logo()">
        <img *ngIf="!logoPosition" src="assets/logo.png" alt="Logo" />
        <img *ngIf="logoPosition" class="header-image-search" src="assets/logo.png" alt="Logo" />
      </a>

      <div class="left-searchpd" *ngIf="!searchBar">
        <div class="left_search">
          <div>

          <form class="banner_form">
          <div class="form-group ">
    <input type="text"
    placeholder="Search Activity..."
           aria-label="Activity"
           [formControl]="searchTerm"
           class="form-control camp_input "
           matInput
           [matAutocomplete]="autoHeader2">
          </div>
          <div class="search-location">
          <span data-toggle="modal" data-target="#locationMod">
         <img src="assets/search-location.png" /></span>
        <input placeholder="Search Jersey City" (keydown.enter)="$event.preventDefault()" autocorrect="off" autocapitalize="off" spellcheck="off" #search readonly />
        </div>
        <div class="form-group cursor">
      <button (click)="searchKeyword(searchTerm.value)" class="banner_button cursor" routerLink="/search">
                    <img src="assets/search_icon.svg" alt="Search image" />
                  </button>
                                    </div>
    <mat-autocomplete  autoActiveFirstOption #autoHeader2="matAutocomplete">
      <div *ngFor="let group of allData">
    <mat-optgroup *ngIf="group?.data?.length" [label]="group.label" >
    <mat-option *ngFor="let option of group.data | slice:0:3"  [value]="option.name" (onSelectionChange)="selectSearchedOption(option)" (click)="selectSearchedOption(option)" >
        {{option.name}}
        <span class="search-programlist">
                          <img src="assets/program-search.svg" />
                        </span>
      </mat-option>  
    </mat-optgroup>
    </div>
    </mat-autocomplete>
</form>
          </div>
        </div>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" [ngClass]="{ 'before-nav': logoPosition }">
          <li class="nav-item">
            <a class="nav-link cursor" [routerLink]="['/about-wondrfly']">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor" [routerLink]="['/blogs']">Blog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor" [routerLink]="['/ask-to-join']">Join the Beta</a>
          </li>
          <li>
            <a [routerLink]="['/login']" class="btn_style cursor">Sign In</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>


<!----------------------------------------- location Modal ------------------------------------------------------->

<div class="modal fade verification_modal Location-Modal" id="locationModal" data-backdrop="static"
  data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <button type="button" class="close" id="close_modal" data-dismiss="modal" aria-label="Close">
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
          <button (click)="setCurrentLocation()" data-dismiss="modal" type="submit" class="SignBtn">
            Allow
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



`,
  styleUrls: ["./header2.component.css"],
})
export class Header2Component implements OnInit {
  logoPosition = false;
  searchBar = false;
  routeName: string;
  categoriesBySearch: any;
  filterData: any = {
    subcatId: "",
    categoryId: '',
    activityName: "",
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
  address: string;
  private count = 0;
  private n = 3;
  private geoCoder;
  providersBySearch: any;
  lat: string
  lng: string
  activitySearched = 0;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef;
  categoryData: any;
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private mapsAPILoader: MapsAPILoader,
    public dataservice: DataService,
    private ngZone: NgZone,
    private cookies: CookieService,
    private createCookies:createCookies
  ) {
    this.activitySearched = Number(this.cookies.get('activitySearched'))
    this.routeName = this.router.url;
    if (this.routeName === "/search") {
      this.logoPosition = true;
    }
    if (this.routeName === '/') { this.searchBar = true }
  }
  // search by activity name or date
  searchActivityByNameDate() {
    this.filterData.searchedCategoryKey = this.filterData.activityName
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }
  // search by sub category
  searchBySubCategory(id) {
    if(!this.activitySearched){
      this.activitySearched=1
      this.cookies.set('activitySearched',String(this.activitySearched) );
      this.createCookies.createCookie('regWall',1,4);
    }
    this.filterData.activityName = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.categoryId = ''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
    if (this.routeName === "/search") {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["search"]));
    }
  }
  logo() {
    this.router.navigate([""]);
  }
  ngOnInit() {
    this.searchTerm.valueChanges.subscribe((value) => {
      if (value) { this.searchSubCategory(value) } else {
        this.allData = [];
      }
    })
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
  // activity search by sub category
  searchByCategory(id) {
    if(!this.activitySearched){
      this.activitySearched=1
      this.cookies.set('activitySearched',String(this.activitySearched) );
      this.createCookies.createCookie('regWall',1,4);
    }
    this.filterData.activityName = ''
    this.filterData.categoryId = id
    this.filterData.subcatId = ''
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

  goToProviderProfile(provider) {
    this.filterData.activityName = "";
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g, "-");
    provider.firstName = provider.firstName.replace(/\?/g, "-");
    this.router.navigate(["/provider/program-provider", provider.firstName, provider._id])
    this.router.navigate(["/provider/program-provider", provider.firstName, provider._id,]);
    if (this.routeName === "/provider/program-provider", provider.firstName, provider._id) {
      this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/provider/program-provider", provider.firstName, provider._id]));
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
  searchKeyword(txt) {
    //     var stringArray = key.split(" ")
    if (txt) {
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
            if(!this.activitySearched){
              this.activitySearched=1
              this.cookies.set('activitySearched',String(this.activitySearched) );
              this.createCookies.createCookie('regWall',1,4);
            }
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

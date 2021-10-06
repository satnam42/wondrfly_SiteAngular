import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SearchComponent } from "src/app/pages/search/search.component";
import { Globals } from "../../common/imageLoader";
import { ApiService } from "../../services/api.service.service";
import { DataService } from "../../services/dataservice.service ";

@Component({
  selector: "app-header2",
  template: `
    <header [ngClass]="{ 'search-header': logoPosition }">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="cursor header-logo" (click)="logo()">
            <img *ngIf="!logoPosition" src="assets/logo.png" alt="Logo" />
            <img
              *ngIf="logoPosition"
              class="header-image-search"
              src="assets/logo.png"
              alt="Logo"
            />
          </a>

          <div class="left-searchpd" *ngIf="!searchBar">
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
                      <img src="assets/search_icon.svg" alt="Search image" />
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
                          (click)="searchActivityByCategory(category._id)"
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
            <ul
              class="navbar-nav ml-auto"
              [ngClass]="{ 'before-nav': logoPosition }"
            >
              <li class="nav-item">
                <a class="nav-link cursor" [routerLink]="['/about-wondrfly']"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link cursor" [routerLink]="['/blogs']">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link cursor" [routerLink]="['/faq']">FAQ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link cursor" [routerLink]="['/ask-to-join']"
                  >Ask to join</a
                >
              </li>
              <li>
                <a [routerLink]="['/login']" class="btn_style cursor"
                  >SIGN IN</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
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
    activityName: "",
  };
  providersBySearch: any;
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService
  ) {
    this.routeName = this.router.url;
    if (this.routeName === "/search") {
      this.logoPosition = true;
    }
    // if(this.routeName === '/search'|| this.routeName === '/'){ this.searchBar=true}
  }
  searchActivityByNameDate() {
    this.dataservice.setOption(this.filterData);
    this.router.navigate(["/search"]);
  }
  logo() {
    if (this.logoPosition) {
      this.router.navigate([""]);
    } else {
      this.router.navigate(["/search"]);
    }
  }
  ngOnInit() {}

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

  searchActivityByCategory(id) {
    this.filterData.activityName = "";
    this.filterData.subcatId = id;
    this.dataservice.setOption(this.filterData);
    this.router.navigate(["/search"]);
  }

  goToProviderProfile(provider) {
    this.filterData.activityName = "";
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g, "-");
    provider.firstName = provider.firstName.replace(/\?/g, "-");
    this.router.navigate([
      "/program-provider",
      provider.firstName,
      provider._id,
    ]);
  }
}

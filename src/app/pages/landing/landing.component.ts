import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Category, User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { Title, Meta } from '@angular/platform-browser';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MapsAPILoader } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  baseUrl = environment.baseUrl
  blogUrl = environment.blogsUrl;
  loggedIn: boolean;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  categories: any = new Category;
  lat: string
  lng: string
  filterData: any = {
    subcatId: '',
    categoryId: '',
    activityName: '',
    searchedCategoryKey: '',
    lat: '',
    lng: '',

  }
  categoryResponse: any;
  hide: boolean = true;
  landingImageIndex: number;
  landingImages = ['assets/landing/header.jpg',
    'assets/landing/header1.jpg',
  ]
  blog: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  altBanner: any = ''
  private geoCoder;
  cookiesData: string;
  regWallCookies = 0
  @ViewChild('search') searchElementRef: ElementRef;
  constructor(private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private cookies: CookieService
  ) {
    this.regWallCookies = Number(this.cookies.get('regWall'))
  }
  searchBySubCategory(id) {
    let regCount = this.regWallCookies + 1
    this.cookies.set('regWall', String(regCount), 30);
    this.filterData.activityName = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.categoryId = ''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }

  searchByCategory(id) {
    let regCount = this.regWallCookies + 1
    this.cookies.set('regWall', String(regCount), 30);
    this.filterData.activityName = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.subcatId = ''
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchByLocation() {
    this.filterData.searchedCategoryKey = this.filterData.activityName
    this.filterData.activityName = ''
    this.filterData.categoryId = ''
    this.filterData.lat = this.lat
    this.filterData.lng = this.lng
    this.dataservice.setLocation(this.filterData)
    this.router.navigate(['/search']);
  }
  getCategoryList() {
    let removedCategory;
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      const idToRemove = '60b47687bb70a952280bfa7b';
      removedCategory = this.categories.filter((item) => item.id === idToRemove);
      this.categories = this.categories.filter((item) => item.id !== idToRemove);
      this.categories.push(removedCategory[0])
      this.categories = this.categories.filter((item) => item.isActivated === true);
      console.log('category list ', this.categories);
    });
  }
  searchActivityByNameDate() {
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }

  // ------------------------------------------------get blogs  -------------------------------------------


  getBlog() {
    axios.get(`${this.blogUrl}/blogs?_start=0&_limit=3`).then(response => {
      this.blog = response.data
    });
  }

  setBlog(data) {
    var title = data.title
    title = title.toLowerCase();
    title = title.replace(/ /g, "-");
    title = title.replace(/\?/g, "-");
    this.router.navigate(['blogs/', title, data.id])
  }

  searchSubCategory(key) {
    this.apiservice.searchTag(key).subscribe((res: any) => {
      console.log(res, 'res')
      this.categoriesBySearch = res;
      this.categoriesBySearch.category = this.categoriesBySearch.category.filter((item) => item.isActivated !== false);
      this.categoriesBySearch.tags = this.categoriesBySearch.tags.filter((item) => item.isActivated !== false);



    })
  }
  providerSearch(key) {
    this.apiservice.searchUsers(key, 'provider').subscribe((res: any) => {
      if (res.data) {
        this.providersBySearch = res.data;
      }
      else {
        this.providersBySearch = []
      }
    })
  }
  goToProviderProfile(provider) {
    this.filterData.activityName = ''
    var providerName = provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g, "-");
    providerName = providerName.replace(/\?/g, "-");
    this.router.navigate(['provider/program-provider', providerName, provider._id]);
  }

  setVisit() {
    this.cookiesData = this.cookies.get('isTour');
    console.log('get isTour count ', this.cookiesData)
    // if(Number(this.cookiesData)!=2 || Number(this.cookiesData)!=3 || Number(this.cookiesData)!=5 || Number(this.cookiesData)!=6 || Number(this.cookiesData)!=8 || Number(this.cookiesData)!=9 || Number(this.cookiesData)!=12){
    // let num = Number(this.cookiesData)+1
    //     this.cookies.set('isTour', String(num), 30);
  }
  // }
  ngOnInit() {
    this.setVisit();
    window.scroll(0, 0);
    this.landingImageIndex = Math.floor(Math.random() * this.landingImages.length);
    if (this.landingImageIndex) {
      this.altBanner = 'Fun Activities for Kids'
    }
    else {
      this.altBanner = 'Kids Activities'
    }
    this.getCategoryList();
    this.getBlog();
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' },
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
    );


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

}

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
import { FormControl } from '@angular/forms';

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
  activitySearched = 0
  @ViewChild('search') searchElementRef: ElementRef;
  allData: any=[];
  searchTermlanding= new FormControl();
  categoryData: any;
  constructor(private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private apiservice: ApiService,
    public dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private cookies: CookieService
  ) {
    this.activitySearched = Number(this.cookies.get('activitySearched'))
  }
  searchBySubCategory(data) {
    let regCount = this.activitySearched + 1
    this.cookies.set('activitySearched', String(regCount), 30);
    // this.filterData.activityName = ''
    // this.filterData.lat = ''
    // this.filterData.lng = ''
    // this.filterData.categoryId = ''
    // this.filterData.subcatId = id
    // this.dataservice.setOption(this.filterData)
    // this.router.navigate(['/search']);
    let filter = `tagsIds=${data._id}`
    this.router.navigate(['/search'], {
      queryParams: {
        filter: filter
      }
    });
  }

  searchByCategory(data) {
    let regCount = this.activitySearched + 1
    this.cookies.set('activitySearched', String(regCount), 30);
    // this.filterData.activityName = ''
    // this.filterData.lat = ''
    // this.filterData.lng = ''
    // this.filterData.subcatId = ''
    // this.filterData.categoryId = id
    // this.dataservice.setOption(this.filterData)
    // this.router.navigate(['/search']);

    let filter = `categoryId=${data.id}`
    this.router.navigate(['/search'], {
      queryParams: {
        filter: filter
      }
    });
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

  // searchSubCategory(key) {
  //   this.apiservice.searchTag(key).subscribe((res: any) => {
  //     this.categoriesBySearch = res;
  //     this.categoriesBySearch.category = this.categoriesBySearch.category.filter((item) => item.isActivated !== false);
  //     this.categoriesBySearch.tags = this.categoriesBySearch.tags.filter((item) => item.isActivated !== false);
  //   })
  // }


  searchSubCategory(key) {
    let groupDataAll:any =[
       {label:'Keywords',data:[]},
       {label:'Provider',data:[]},
     ]
     if(!key){
       this.allData=[];
     }else{
      this.apiservice.searchKeywords(key).subscribe((res: any) => {
        this.categoriesBySearch = res.data;
        res.data.map(keyword=>{keyword.name = keyword.keywordName})
        // this.categoriesBySearch.category = this.categoriesBySearch.category.filter((item) => item.isActivated !== false);
        // this.categoriesBySearch.tags = this.categoriesBySearch.tags.filter((item) => item.isActivated !== false && item.programCount);
        // this.categoryData = this.categoriesBySearch.concat(this.categoriesBySearch)
        groupDataAll[0].data = this.categoriesBySearch;
      });
     this.apiservice.searchUsers(key, "provider").subscribe((res: any) => {
       if (res.isSuccess===true) {
       this.providersBySearch = res.data;
       var i;
       for(i = 0; i < this.providersBySearch.length; i++){
         this.providersBySearch[i].name = this.providersBySearch[i]['firstName'];
       groupDataAll[1].data=this.providersBySearch;
       this.allData=groupDataAll
       }}
       else {
        groupDataAll[1].data = []
        this.allData=groupDataAll
       }
       });
     }
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
    // if(Number(this.cookiesData)!=2 || Number(this.cookiesData)!=3 || Number(this.cookiesData)!=5 || Number(this.cookiesData)!=6 || Number(this.cookiesData)!=8 || Number(this.cookiesData)!=9 || Number(this.cookiesData)!=12){
    // let num = Number(this.cookiesData)+1
    //     this.cookies.set('isTour', String(num), 30);
  }
  // }
  onTab(e,value){
    if(this.allData[0].data.length){
      this.searchTermlanding.setValue(value)
    }
 }
  ngOnInit() {
    this.searchTermlanding.valueChanges.subscribe((value) =>{
      if(value){this.searchSubCategory(value)}else{
        this.allData=[];
      }   
      })
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

  selectSearchedOption(data){
    if(data.role=='provider'){
      this.filterData.activityName = "";
  data.name = data.name.toLowerCase();
  data.name = data.name.replace(/ /g, "-");
  data.name = data.name.replace(/\?/g, "-");
  this.router.navigate(["/provider/program-provider", data.name, data._id])
    }
    else {
           let regCount = this.activitySearched + 1
      this.cookies.set('activitySearched', String(regCount), 30);
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
          if(filter){
            this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(['/search'], {
              queryParams: {
                filter: filter
              }
            }));
          }
          else{
            this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(['/search']));
          }
 
        } else {
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(['/search']));
        }
      })
    }
  }
}

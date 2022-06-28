import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { Category, Child, User } from 'src/app/core/models';
import { LocalStorageService } from 'src/app/core/services';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { TypeFormService } from 'src/app/core/services/typeform.service';
import { environment } from 'src/environments/environment.prod';
import * as FileSaver from 'file-saver';
import { MapsAPILoader } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'parent-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  rightDisabled: boolean = false;
  leftDisabled: boolean = false;
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  blogUrl = environment.blogsUrl;
  baseUrl = environment.baseUrl;
  currentDate = new Date()
  loggedIn: boolean;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  categories: any = new Category;
  feedback: any = [{ name: 'Take a poll', description: 'This will take 5 munites.' }, { name: 'Give us you input', description: 'This will take 10 munites.' }, { name: 'Share your opinion', description: 'This will take 15 munites.' }];
  blogs: any = []
  featuredBlogs: any = []
  printables: any = []
  tweetData: any = []
  tweetDataBlogPath: any = ''
  filterData: any = {
    subcatId: '',
    categoryId: '',
    activityName: '',
    searchedCategoryKey: '',
    lat: '',
    lng: '',
    kidAge: '',
    childIntrests: []
  }
  categoryResponse: any;
  hide: boolean = true;
  resources: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  currentUser: any;
  kids: Child[];
  isNewFeaturePopUp: boolean;
  blogByCategory: any;
  private geoCoder;
  allData: any = [];
  searchMywondrfly = new FormControl();
  @ViewChild('search') searchElementRef: ElementRef;
  lat: string
  lng: string
  resourcesType = 'do-together'
  cookiesData: string;
  categoryData: any;
  constructor(private router: Router,
    private apiservice: ApiService,
    public dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private store: LocalStorageService,
    private typeFormService: TypeFormService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cookies: CookieService
  ) {
    this.currentUser = this.auth.currentUser();
    this.getChildByParentId(this.currentUser.id);
    if (!/\s/.test(this.currentUser.firstName)) {
      this.currentUser.firstName = this.currentUser.firstName + ' ' //added space for showing 1st name
    }
    if (!this.currentUser) {
      this.router.navigate(['']);
    }
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 650;
    // this.checkScroll()
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 650;
    // this.checkScroll()
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


  // searchByLocation() {
  //   this.filterData.activityName=''
  //   this.filterData.categoryId = ''
  //   this.filterData.subcatId= ''
  //   this.filterData.lat = this.lat
  //   this.filterData.lng = this.lng
  //   this.dataservice.setLocation(this.filterData)
  //   this.router.navigate(['/search']);
  // }
  searchActivityByNameDate() {
    this.filterData.searchedCategoryKey = this.filterData.activityName
    this.filterData.kidAge = ''
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.childIntrests = []
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);

  }
  searchBySubCategory(data) {
    // this.filterData.activityName = ''
    // this.filterData.categoryId = ''
    // this.filterData.lat = ''
    // this.filterData.lng = ''
    // this.filterData.subcatId = data._id
    // this.filterData.childIntrests = []
    // this.dataservice.setOption(this.filterData)
    // this.router.navigate(['/search']);
    let filter = ``
    if (this.filterData.kidAge) {
      filter = `tagsIds=${data._id}&ageFrom=${0}&ageTo=${this.filterData.kidAge}`
      this.router.navigate(['/search'], {
        queryParams: {
          filter: filter
        }
      });
    } else {
      filter = `tagsIds=${data._id}`
      this.router.navigate(['/search'], {
        queryParams: {
          filter: filter
        }
      });
    }
  }
  clickOnViewAllChildIntrests(indx) {
    // this.filterData.activityName = ''
    // this.filterData.categoryId = ''
    // this.filterData.lat = ''
    // this.filterData.lng = ''
    // this.filterData.subcatId = ''
    // this.filterData.childIntrests = []
    let filter = ``
    this.kids[indx].interestInfo.forEach(intrest => {
      {
        this.filterData.childIntrests.push(intrest._id)
      }
    });
    filter = `tagsIds=${this.filterData.childIntrests.toString()}&ageFrom=${0}&ageTo=${this.filterData.kidAge}`
    this.router.navigate(['/search'], {
      queryParams: {
        filter: filter
      }
    });
    // this.dataservice.setOption(this.filterData)
    // this.router.navigate(['/search']);
  }
  searchByCategory(data) {
    // this.filterData.kidAge = ''
    // this.filterData.subcatId = ''
    // this.filterData.activityName = ''
    // this.filterData.categoryId = id
    // this.filterData.childIntrests = []
    // this.dataservice.setOption(this.filterData)
    // this.router.navigate(['/search']);
    let filter = `categoryId=${data._id}`
    this.router.navigate(['/search'], {
      queryParams: {
        filter: filter
      }
    });
  }

  doTogather(data) {
    var name = data.categoryName;
    name = name.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/\?/g, "-");
    this.router.navigate(['blogs/category/', name, data.id])
  }

  tweetCategory() {
    let data = {
      id: 14,
      categoryName: 'Funny Tweets',
    }
    var name = data.categoryName;
    name = name.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/\?/g, "-");
    this.router.navigate(['blogs/category/', name, data.id])
  }



  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.categories = this.categories.filter((item) => item.isActivated !== false);
    });
  }

  // feedbackSurveyList() {
  //   this.apiservice.feedbackSurveyList().subscribe((res: any) => {
  //     this.feedback = res;
  //   });
  // }


  downloadFile(file) {
    FileSaver.saveAs(this.blogUrl + file.url, file.name);
  }

  getTweet() {
    const responcee = axios.get(`${this.blogUrl}/funny-tweets?_sort=published_at:DESC&_limit=4`).then((response) => {
      this.tweetData = response.data;
      this.tweetDataBlogPath = new URL(this.tweetData[0].blogLink).pathname;
    });
  }

  // ------------------------------------------------get printables data  -------------------------------------------

  getPrintables() {
    const responcee = axios.get(`${this.blogUrl}/printables?_sort=published_at:DESC&_limit=4`).then((response) => {
      this.printables = response.data;
    });
  }

  // ------------------------------------------------get blogs  -------------------------------------------

  getBlog() {
    const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&_limit=4`).then((response) => {
      this.blogs = response.data;
    });
  }

  // ------------------------------------------------get featured blogs  -------------------------------------------

  getfeaturedBlog() {
    const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&isFeatured=true&_limit=4`).then((response) => {
      this.featuredBlogs = response.data;
    });
  }

  getBlogByCat() {
    const responcee = axios.get(`${this.blogUrl}/categories/?id=12`).then(response => {
      this.blogByCategory = response.data[0];
      this.blogByCategory.blogs.reverse();
    });
  };

  // setBlog(data) {
  //   var title = data.title
  //   title = title.toLowerCase();
  //   title = title.replace(/ /g,"-");
  //   title = title.replace(/\?/g,"-");
  //   this.router.navigate(['blogs/',title, data.id])
  // }

  providerSearch(key) {
    this.apiservice.searchUsers(key, 'provider').subscribe((res: any) => {
      if (res.data) {
        this.providersBySearch = res.data;
      }
      else {
        this.providersBySearch = []
      }
    })
  };

  goToProviderProfile(provider) {
    this.filterData.activityName = ''
    var providerName = provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g, "-");
    providerName = providerName.replace(/\?/g, "-");
    this.router.navigate(['provider/program-provider', providerName, provider._id]);
  };

  getChildByParentId(id) {
    this.ngxLoader.start();
    this.apiservice.getChildByParentId(id).subscribe((res: any) => {
      if (!res.error) {
        let kids = res
        kids = kids.filter((item) => item.isActivated === true);
        let childIds = ''
        let count = 1
        for (let kid of kids) {
          if (count <= 1) {
            childIds += kid.id
            count++
          }
          else {
            childIds += ',' + kid.id
          }
        }
        if (childIds) {
          this.apiservice.childrenWithFiltredActivity(childIds).subscribe((filtredKidsResponse: any) => {
            this.kids = filtredKidsResponse.data
          })
        }
      }
      this.ngxLoader.stop();

    })
  }
  sendInvite() {
    this.store.setItem('sendInvite', '1')
    this.router.navigate(['/parent/profile', this.currentUser.id]);
  }
  // getForms(){
  //   this.typeFormService.getForms().subscribe((res: any) => {
  //   });
  // }

  setBlog(data) {
    var title = data.title;
    title = title.toLowerCase();
    title = title.replace(/ /g, "-");
    title = title.replace(/\?/g, "-");
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['blogs/', title, data.id])
    );
    window.open(url, '_blank');
  }

  setVisit() {
    this.cookiesData = this.cookies.get('isTour');
    // if(Number(this.cookiesData)!=2 || Number(this.cookiesData)!=3 || Number(this.cookiesData)!=5 || Number(this.cookiesData)!=6 || Number(this.cookiesData)!=8 || Number(this.cookiesData)!=9 || Number(this.cookiesData)!=12){
    // let num = Number(this.cookiesData)+1
    //     this.cookies.set('isTour', String(num), 30); 
  }
  // }
  onTab(e, value) {
    if (this.allData[0].data.length) {
      this.searchMywondrfly.setValue(value)
    }
  }
  ngOnInit() {
    this.searchMywondrfly.valueChanges.subscribe((value) => {
      if (value) { this.searchSubCategory(value) } else {
        this.allData = [];
      }
    })
    this.setVisit();
    this.getTweet();
    this.getPrintables();
    this.getBlogByCat();
    this.getfeaturedBlog();
    this.getBlog();
    this.getCategoryList();
    // this.feedbackSurveyList();
    // this.getForms();
    this.metaService()
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
    window.scroll(0, 0);
  }
  metaService() {
    this.apiservice.getMetaServiceByPageName('my-wondrfly').subscribe(res => {
      if (res.isSuccess) {
        if (res.data !== null) {
          this.titleService.setTitle(res.data.title);
          this.metaTagService.updateTag(
            { name: 'description', content: res.data.description }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: res.data.keywords }
          );
        }
        else {
          this.titleService.setTitle(this.title);
          this.metaTagService.updateTag(
            { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' },
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
          );
        }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' },
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
        );
      }
    })

  }
  selectSearchedOption(data) {
    if (data.role == 'provider') {
      this.filterData.activityName = "";
      data.name = data.name.toLowerCase();
      data.name = data.name.replace(/ /g, "-");
      data.name = data.name.replace(/\?/g, "-");
      this.router.navigate(["/provider/program-provider", data.name, data._id])
    }
    //  else if (!data.categoryIds && !data.role) {
    //   // // this.filterData.activityName = "";
    //   // // this.filterData.subcatId = '';
    //   // // this.filterData.categoryId = data._id;
    //   // // this.filterData.searchedCategoryKey = data.name;
    //   // // this.dataservice.setOption(this.filterData);
    //   // // this.router.navigate(["/search"]);
    //   // let filter = `categoryId=${data._id}`
    //   // this.router.navigate(['/search'], {
    //   //   queryParams: {
    //   //     filter: filter
    //   //   }
    //   // });
    // }
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
      txt += `&parentId=${this.currentUser.id}`
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

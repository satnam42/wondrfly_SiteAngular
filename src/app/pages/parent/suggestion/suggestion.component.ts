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
@Component({
  selector: 'parent-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  blogUrl = environment.blogsUrl;
  currentDate = new Date()
  loggedIn: boolean;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  categories: any = new Category;
  feedback: any = [];
  blogs:any = []
  printables:any=[]
  tweetData:any = []
  tweetDataBlogPath:any = ''
  filterData: any = {
    subcatId: '',
    categoryId:'',
    activityName: '',
    searchedCategoryKey:'',
    lat:'',
    lng:''
  }
  categoryResponse: any;
  hide: boolean = true;
  resources: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  currentUser: any;
  kids:Child[];
  isNewFeaturePopUp:boolean;
  blogByCategory: any;
  private geoCoder;
  @ViewChild('search') searchElementRef: ElementRef;
  lat: string
 lng : string
  constructor(private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private store:LocalStorageService,
    private typeFormService: TypeFormService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
   ) {
    this.currentUser = this.auth.currentUser();
if(!this.currentUser){
  this.router.navigate(['/']);
}
  }
  searchSubCategory(key){
    this.apiservice.searchTag(key).subscribe((res:any)=>{
  this.categoriesBySearch = res;
  this.categoriesBySearch.category = this.categoriesBySearch.category.filter((item) => item.isActivated !== false);
  this.categoriesBySearch.tags = this.categoriesBySearch.tags.filter((item) => item.isActivated !== false);


    })
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
    this.filterData.searchedCategoryKey=this.filterData.activityName
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchBySubCategory(id) {
    this.filterData.searchedCategoryKey=this.filterData.activityName
    this.filterData.activityName=''
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchByCategory(id) {
    this.filterData.searchedCategoryKey=this.filterData.activityName
    this.filterData.subcatId= ''
    this.filterData.activityName=''
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.categories = this.categories.filter((item) => item.isActivated !== false);
      console.log('categories',this.categories)
    });
  }

  feedbackSurveyList() {
    this.apiservice.feedbackSurveyList().subscribe((res: any) => {
      this.feedback = res;
      console.log('feedback',this.feedback)
    });
  }
  // ------------------------------------------------get resources  -------------------------------------------

  getResources() {
    axios.get(`${this.blogUrl}/resources?_start=0&_limit=2`).then(response => {
      this.resources = response.data
      console.log('resources',this.resources)
    });
  }

  downloadFile(file){
    FileSaver.saveAs(this.blogUrl+file.url,file.name);
  }

  getTweet() {
    const responcee = axios.get(`${this.blogUrl}/funny-tweets`).then((response) => {
      this.tweetData = response.data;
      this.tweetDataBlogPath = new URL (this.tweetData[0].blogLink).pathname;
      console.log('tweetData',this.tweetData)
    });
  }

    // ------------------------------------------------get printables data  -------------------------------------------

    getPrintables() {
      const responcee = axios.get(`${this.blogUrl}/printables?_sort=published_at:DESC&_limit=2`).then((response) => {
        this.printables = response.data;
        console.log('printables',this.printables)
      });
    }

  // ------------------------------------------------get blogs  -------------------------------------------

  getBlog() {
    const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&_limit=2`).then((response) => {
      this.blogs = response.data;
    });
  }

  getBlogByCat(){
    const responcee = axios.get(`${this.blogUrl}/categories/?id=12`).then(response => {
      this.blogByCategory = response.data[0];
      this.blogByCategory.blogs.reverse();
      console.log(this.blogByCategory.blogs,'blogByCategory');


    });
}

  // setBlog(data) {
  //   var title = data.title
  //   title = title.toLowerCase();
  //   title = title.replace(/ /g,"-");
  //   title = title.replace(/\?/g,"-");
  //   this.router.navigate(['blogs/',title, data.id])
  // }

  providerSearch(key){
    this.apiservice.searchUsers(key,'provider').subscribe((res:any)=>{
      this.providersBySearch = res.data;
    })
  }
  goToProviderProfile(provider) {
    this.filterData.activityName=''
    var providerName =provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g,"-");
    providerName = providerName.replace(/\?/g,"-");
      this.router.navigate(['/program-provider', providerName, provider._id]);
  }
getChildByParentId(){
  this.apiservice.getChildByParentId(this.currentUser.id).subscribe((res: any) => {
    this.kids = res
    this.kids = this.kids.filter((item) => item.isActivated !== false);
    console.log('children List', this.kids)

  });
}
sendInvite(){
  this.store.setItem('sendInvite','1')
  this.router.navigate(['/parent/profile',this.currentUser.id]);
}
getForms(){
  this.typeFormService.getForms().subscribe((res: any) => {
    console.log('typeFormService', res)
  });
}
  ngOnInit() {
    this.getTweet()
    this.getPrintables()
    this.getBlogByCat()
    this.getBlog()
    this.getChildByParentId()
    this.getCategoryList();
    this.feedbackSurveyList();
    this.getResources();
    this.getForms();
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

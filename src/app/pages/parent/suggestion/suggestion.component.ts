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
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  rightDisabled: boolean = false;
  leftDisabled: boolean = false;
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  blogUrl = environment.blogsUrl;
  baseUrl =environment.baseUrl;
  currentDate = new Date()
  loggedIn: boolean;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  categories: any = new Category;
  feedback: any = [];
  blogs:any = []
  featuredBlogs:any = []
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
 resourcesType='do-together'
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
  this.router.navigate(['']);
}
  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 650;
    // this.checkScroll()
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 650;
    // this.checkScroll()
  }

  // checkScroll(){
  //   this.widgetsContent.nativeElement.scrollLeft==0? this.leftDisabled = true :this.leftDisabled = false;

  //   let newScrollLeft = this.widgetsContent.nativeElement.scrollLeft;
  //   let width = this.widgetsContent.nativeElement.clientWidth;
  //   let scrollWidth = this.widgetsContent.nativeElement.scrollWidth;
  //   scrollWidth - (newScrollLeft+width)==0? this.rightDisabled = true :this.rightDisabled = false;
  // }

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
    this.filterData.activityName=''
    this.filterData.categoryId = ''
    this.filterData.lat = ''
    this.filterData.lng = ''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchByCategory(id) {
    this.filterData.subcatId= ''
    this.filterData.activityName=''
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }

doTogather(data) {
  var name = data.categoryName;
  name = name.toLowerCase();
      name = name.replace(/ /g,"-");
      name = name.replace(/\?/g,"-");
      this.router.navigate(['blogs/category/',name, data.id])
}

tweetCategory(){
  let  data={
    id: 14,
    categoryName: 'Funny Tweets',
  }
  var name = data.categoryName;
  name = name.toLowerCase();
      name = name.replace(/ /g,"-");
      name = name.replace(/\?/g,"-");
      this.router.navigate(['blogs/category/',name, data.id])
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
 

  downloadFile(file){
    FileSaver.saveAs(this.blogUrl+file.url,file.name);
  }

  getTweet() {
    const responcee = axios.get(`${this.blogUrl}/funny-tweets?_sort=published_at:DESC&_limit=3`).then((response) => {
      this.tweetData = response.data;
      this.tweetDataBlogPath = new URL (this.tweetData[0].blogLink).pathname;
      console.log('tweetData',this.tweetData)
    });
  }

    // ------------------------------------------------get printables data  -------------------------------------------

    getPrintables() {
      const responcee = axios.get(`${this.blogUrl}/printables?_sort=published_at:DESC&_limit=3`).then((response) => {
        this.printables = response.data;
        console.log('printables',this.printables)
      });
    }

  // ------------------------------------------------get blogs  -------------------------------------------

  getBlog() {
    const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&_limit=3`).then((response) => {
      this.blogs = response.data;
    });
  }

    // ------------------------------------------------get featured blogs  -------------------------------------------

    getfeaturedBlog() {
      const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&isFeatured=true&_limit=3`).then((response) => {
        this.featuredBlogs = response.data;
        console.log('featuredblogs',this.featuredBlogs)
      });
    }

  getBlogByCat(){
    const responcee = axios.get(`${this.blogUrl}/categories/?id=12`).then(response => {
      this.blogByCategory = response.data[0];
      this.blogByCategory.blogs.reverse();
      console.log(this.blogByCategory.blogs,'blogByCategory');
    });
};

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
  };

  goToProviderProfile(provider) {
    this.filterData.activityName=''
    var providerName =provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g,"-");
    providerName = providerName.replace(/\?/g,"-");
      this.router.navigate(['/program-provider', providerName, provider._id]);
  };
  
getChildByParentId(){
  this.apiservice.getChildByParentId(this.currentUser.id).subscribe((res: any) => {
    this.kids = res
    this.kids = this.kids.filter((item) => item.isActivated === true && item.interestInfo.length );
  })
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

setBlog(data){
  console.log('clicked blog', data)
  var title = data.title;
  title = title.toLowerCase();
  title = title.replace(/ /g,"-");
  title = title.replace(/\?/g,"-");
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['blogs/',title, data.id])
  );
  window.open(url, '_blank');
}


  ngOnInit() {
    this.getTweet();
    this.getPrintables();
    this.getBlogByCat();
    this.getfeaturedBlog();
    this.getBlog();
    this.getChildByParentId();
    this.getCategoryList();
    this.feedbackSurveyList();
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
    window.scroll(0,0);
  }
}

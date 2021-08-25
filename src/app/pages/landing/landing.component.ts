import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Category, User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { Title, Meta } from '@angular/platform-browser';
import { FormGroup  } from '@angular/forms';
import { SocialUser } from 'src/app/core/models/social.model';
import { Globals } from 'src/app/core/common/imageLoader';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'https://i.imgur.com/QsFAQso.jpg';
  blogUrl = environment.blogsUrl;
  user: SocialUser;
  userGoogle: SocialUser;
  loggedIn: boolean;
  isMap: boolean = true;
  usersData: any = {};
  pickDate: any;
  pageNo: number = 1;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  pageSize: number;
  forums: any;
  categories: any = new Category;
  filterData: any = {
    categoryId: '',
    activityName: '',
    activityDate: ''
  }



  parentForm: FormGroup;
  userData: any = {
    firstName: '',
    email: '',
    password: '',
    role: 'provider',
    name: '',

    facebookId: '',

    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
  }

  message: string = 'Registered Successfully!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  landingImageIndex: number;
  landingImages = ['assets/landing/header.jpg',
    'assets/landing/header1.jpg',
  ]
  googleData: SocialUser;
  blog: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  count: any;
  constructor(private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
   ) {
  }
  searchActivityByCategory(id) {
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchActivityByNameDate() {
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
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
    title = title.replace(/ /g,"-");
    title = title.replace(/\?/g,"-");
    this.router.navigate(['blogs/',title, data.id])
  }



  searchCategory(key){
    this.apiservice.searchCategory(key).subscribe((res:any)=>{
  this.categoriesBySearch = res.data;
    })
  }
  providerSearch(key){
    this.apiservice.searchUsers(key,'provider').subscribe((res:any)=>{
      this.providersBySearch = res.data;
    })
  }
  goToProviderProfile(provider) {
    var providerName =provider.firstName;
    providerName = providerName.toLowerCase();
    providerName = providerName.replace(/ /g,"-");
    providerName = providerName.replace(/\?/g,"-");
      this.router.navigate(['/program-provider', providerName, provider._id]);
  }
  ngOnInit() {
    this.landingImageIndex = Math.floor(Math.random() * this.landingImages.length);
    this.getCategoryList();
    this.getBlog();
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' },
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
    );    
  
    

  }

}

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Forum } from 'src/app/core/models/forum.model';
import { Category, User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { LocalStorageService } from 'src/app/core/services';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { Title, Meta } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastyService } from 'ng2-toasty';
import { CustomValidators } from 'ng2-validation';
import { SocialUser } from 'src/app/core/models/social.model';
import { Globals } from 'src/app/core/common/imageLoader';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
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
  constructor(private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    public imageLoader: Globals,
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private toastyService: ToastyService,
    private store: LocalStorageService) {
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


  // signUpModal() {
  //   if (localStorage.getItem("token") === null) {
  //     setTimeout(() => {
  //       console.log('timerrrrrr')
  //       this.parentForm.reset()
  //       window.document.getElementById("modal1").click();
  //     }, 10000);
  //   }
  // }
  ngAfterViewInit() {
    // this.signUpModal()
  }


  // ------------------------------------------------get blogs  -------------------------------------------


  getBlog() {
    axios.get(`${this.blogUrl}/blogs`).then(response => {
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
    this.getBlog()
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' }
    );

  }

  ngOnDestroy() {
    // window.document.getElementById("close_modal").click();
  }

}

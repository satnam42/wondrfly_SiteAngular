import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { Category, Child, User } from 'src/app/core/models';
import { LocalStorageService } from 'src/app/core/services';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { environment } from 'src/environments/environment.prod';
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
  filterData: any = {
    subcatId: '',
    categoryId:'',
    activityName: '',
  }
  categoryResponse: any;
  hide: boolean = true;
  resources: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  activityName:any=''
  currentUser: any;
  kids:Child[];

  constructor(private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private store:LocalStorageService
   ) {
    this.currentUser = this.auth.currentUser();
if(!this.currentUser){
  this.router.navigate(['/']);
}
  }
  searchSubCategory(key){
    this.apiservice.searchTag(key).subscribe((res:any)=>{
  this.categoriesBySearch = res;
    })
  }
  filterByNameDate(){}
  searchBySubCategory(id) {
    this.filterData.activityName=''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchByCategory(id) {
    this.filterData.activityName=''
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }


  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
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
    console.log('children List', res)
  });
}
sendInvite(){
  this.store.setItem('sendInvite','1')
  this.router.navigate(['/parent/profile',this.currentUser.id]);
}
  ngOnInit() {
    this.getChildByParentId()
    this.getCategoryList();
    this.feedbackSurveyList();
    this.getResources();
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Looking for the best programs and activities for your kids? Wondrfly is the leading platform for parents to discover indoor and outdoor activities for kids ages 3-14 years.' },
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
    );
  }
}

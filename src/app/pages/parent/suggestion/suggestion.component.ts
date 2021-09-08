import { Component, OnInit, } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { Category, User } from 'src/app/core/models';
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
  loggedIn: boolean;
  title = 'Best Activities and Programs for Kids in Jersey City - Wondrfly';
  categories: any = new Category;
  filterData: any = {
    subcatId: '',
    categoryId:'',
    activityName: '',
  }
  categoryResponse: any;
  hide: boolean = true;
  blog: any;
  categoriesBySearch: any = new Category;
  providersBySearch: any = new User;
  constructor(private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService,
    public auth: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
   ) {
  }
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
 searchActivityByNameDate() {
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
    title = title.replace(/ /g,"-");
    title = title.replace(/\?/g,"-");
    this.router.navigate(['blogs/',title, data.id])
  }

  searchSubCategory(key){
    this.apiservice.searchTag(key).subscribe((res:any)=>{
  this.categoriesBySearch = res;
    })
  }
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
  ngOnInit() {
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
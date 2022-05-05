import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Category } from '../../models';
import { ApiService } from '../../services/api.service.service';
import { DataService } from '../../services/dataservice.service ';

@Component({
  selector: 'sitemap',
  template: `
  <app-header2 *ngIf="!isLogin"></app-header2>
    <app-header *ngIf="isLogin"></app-header>

    <div class="site-map">

      <header class="page-header">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 mt-5 mb-2 mb-md-0 col-md-8 col-lg-6 mx-auto text-center">
              <h1>Site Map</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <div class="row mt-5 mb-2 sitemap-wrapper">
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">About Wondrfly</h3>
              <ul>
                <li><a href="">Home</a></li>
                <li><a href="about-wondrfly">About Us</a></li>
                <li><a href="sign-up">Create an Account</a></li>
                <li><a href="term-condition">Terms & Conditions</a></li>
                <li><a href="privacy-policy">Privacy Policy</a></li>
                <li><a href="faq">FAQ</a></li>
                <li><a href="contactUs">Contact Us</a></li>
              </ul>
          </div>
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">Blogs Category</h3>
              <ul>
                <li *ngFor="let category of categories"><a class="cursor" (click)="searchCatg(category)">{{category?.categoryName}}</a></li>
              </ul>
          </div>
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">Search</h3>
              <ul>
                <li><a href="search">Search</a></li>
              </ul>
          </div>
        </div>

        <div class="row mt-5 mb-2 sitemap-wrapper">
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">Programs</h3>
              <ul>
                <li *ngFor="let category of activityCategories"><a class="cursor"(click)="searchByCategory(category.id)">{{category?.name}}</a></li>
              </ul>
          </div>
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">Profile</h3>
              <ul>
                <li><a href="sign-up">Create an Account</a></li>
                <li><a class="cursor" (click)="profile()">Profile Details</a></li>
                <li><a href="forgot-password">Forget Password</a></li>
              </ul>
          </div>
          <div class="col-4 mx-auto mb-4">
            <h3 class="text-uppercase">Others</h3>
          </div>
        </div>
      </div>
    </div>


    <app-footer></app-footer>
`,
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  isLogin = false;
  userData: any = {};
  blogUrl = environment.blogsUrl;
  activityCategories:Category[]
  categories:any = []
  filterData: any = {
    categoryId: '',
  }
  constructor(private apiservice: ApiService, private dataservice: DataService, private router :Router) {
    this.userData = JSON.parse(localStorage.getItem('CurrentUserWondrfly'));
    if (this.userData) {
      this.isLogin = true;
    }
  }

  ngOnInit(){
    this.getCategoryList()
    this.getCategory()
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.activityCategories = res;
    });
  }
  // ------------------------------------------------get blogs category  -------------------------------------------

  getCategory(){
    const responcee = axios.get(`${this.blogUrl}/categories`).then(response => {
      this.categories = response.data
    });
    }
  searchByCategory(id) {
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  searchCatg(data) {
    var name = data.categoryName;
    name = name.toLowerCase();
        name = name.replace(/ /g,"-");
        name = name.replace(/\?/g,"-");
        this.router.navigate(['blogs/category/',name, data.id])
  }
  profile() {
    if (this.userData.role === "parent") {
      this.router.navigate(['/Profile', this.userData.id]);
    }
    else if (this.userData.role === "provider") {
      this.router.navigate(['/profile', this.userData.id]);
    }
    else {
      this.router.navigate(['login']);
    }

  }
}

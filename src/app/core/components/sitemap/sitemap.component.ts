import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models';
import { ApiService } from '../../services/api.service.service';
import { DataService } from '../../services/dataservice.service ';

@Component({
  selector: 'sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  isLogin = false;
  userData: any = {};
  categories:Category[]
  filterData: any = {
    categoryId: '',
  }
  constructor(private apiservice: ApiService, private dataservice: DataService, private router :Router) { 
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
  }

  ngOnInit(){
    this.getCategoryList()
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }
  searchByCategory(id) {
    this.filterData.categoryId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
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

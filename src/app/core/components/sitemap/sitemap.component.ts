import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  isLogin = false;
  userData: any = {};


  constructor() { 
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
   
  }
 

  ngOnInit(): void {
  }

}

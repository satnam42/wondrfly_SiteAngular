import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  isLogin = false;
  userData: any = {};
  data: any;
  title = 'Read our Privacy Policy Agreement - Wondrfly'

  constructor(private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private metaTagService: Meta,
    ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
  }


    // ------------------------------------------------get termsAndConditions  -------------------------------------------
    privacyP(){
  this.ngxLoader.start()
  axios.get(`${this.blogUrl}/privacy-policies`).then(response => {
    this.ngxLoader.stop()
    this.data = response.data

    console.log( 'data on  terms and condition', this.data);
    console.log( 'data on terms and condition axios', this.data[0].title);
  });
  }



  search() {
    this.router.navigate(['/search']);
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "At Wondrfly, one of our main priorities is the privacy of our visitors. If you have any questions or require info about our privacy policy, visit our website."}
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'Wondrfly Privacy Policy, Privacy Policy For kids activities, Privacy Policy Wondrfly, Privacy Policy For kids programs'}
    ); 

    this.privacyP()
    window.scroll(0, 0);
  }
}
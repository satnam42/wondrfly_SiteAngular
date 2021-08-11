import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  userData: any = {};
  isLogin = false;
  terms: any=[];
  title = 'Terms and Conditions - Wondrfly'
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  constructor(private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private metaTagService: Meta,) {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    if (this.userData) {
      this.isLogin = true;
    }
  }

  // ------------------------------------------------get termsAndConditions  -------------------------------------------
getTermsAndConditions(){
  this.ngxLoader.start()
  axios.get(`${this.blogUrl}/terms-and-conditions`).then(response => {
    this.terms = response.data
  });
  this.ngxLoader.stop()
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Please read our terms and conditions carefully before using or accessing our website. Visit Wondrfly’s website for more information." }
    );
    window.scroll(0, 0);
    this.getTermsAndConditions()
  }

}

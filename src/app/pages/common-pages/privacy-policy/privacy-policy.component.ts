import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
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

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private metaTagService: Meta,
    private auths: AuthsService,
    private apiservice:ApiService) {
    this.userData = auths.currentUser()
    if (this.userData) {
      this.isLogin = true;
    }
  }


  // ------------------------------------------------get termsAndConditions  -------------------------------------------
  privacyP() {
    this.ngxLoader.start()
    axios.get(`${this.blogUrl}/privacy-policies`).then(response => {
      this.data = response.data
    });
    this.ngxLoader.stop()
  }



  // search() {
  //   this.router.navigate(['/search']);
  // }

  ngOnInit() {
  this.metaService();
    this.privacyP()
    window.scroll(0, 0);
  }
  metaService(){
    this.apiservice.getMetaServiceByPageName('privacy-policy').subscribe(res=>{
      if (res.isSuccess) {
        if (res.data !== null) {
          this.titleService.setTitle(res.data.title);
          this.metaTagService.updateTag(
            { name: 'description', content: res.data.description }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: res.data.keywords }
          );
        }
        else {
          this.titleService.setTitle(this.title);
          this.metaTagService.updateTag(
            { name: 'description', content: "At Wondrfly, one of our main priorities is the privacy of our visitors. If you have any questions or require info about our privacy policy, visit our website." }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'Wondrfly Privacy Policy, Privacy Policy For kids activities, Privacy Policy Wondrfly, Privacy Policy For kids programs' }
          );     }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: "At Wondrfly, one of our main priorities is the privacy of our visitors. If you have any questions or require info about our privacy policy, visit our website." }
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'Wondrfly Privacy Policy, Privacy Policy For kids activities, Privacy Policy Wondrfly, Privacy Policy For kids programs' }
        ); }
    })

  }
}

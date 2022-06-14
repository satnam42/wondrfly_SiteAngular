import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
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
  terms: any = [];
  title = 'Terms and Conditions - Wondrfly'
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  constructor(private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private metaTagService: Meta,
    private auths: AuthsService,
    private apiservice : ApiService) {
    this.userData = auths.currentUser()

    if (this.userData) {
      this.isLogin = true;
    }
  }

  // ------------------------------------------------get termsAndConditions  -------------------------------------------
  getTermsAndConditions() {
    this.ngxLoader.start()
    axios.get(`${this.blogUrl}/terms-and-conditions`).then(response => {
      this.terms = response.data
    });
    this.ngxLoader.stop()
  }

  ngOnInit() {
  this.metaService()
    window.scroll(0, 0);
    this.getTermsAndConditions()
  }
  metaService(){
    this.apiservice.getMetaServiceByPageName('term-condition').subscribe(res=>{
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
            { name: 'description', content: "Please read our terms and conditions carefully before using or accessing our website. Visit Wondrfly’s website for more information." }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'Terms of Agreement, Terms of Service Agreement, Contracts and Agreements, Wondrfly terms and conditions, Terms Of Service' }
          );   }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: "Please read our terms and conditions carefully before using or accessing our website. Visit Wondrfly’s website for more information." }
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'Terms of Agreement, Terms of Service Agreement, Contracts and Agreements, Wondrfly terms and conditions, Terms Of Service' }
        ); }
    })

  }
}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';

@Component({
  selector: 'app-why-wondrfly',
  templateUrl: './why-wondrfly.component.html',
  styleUrls: ['./why-wondrfly.component.css']
})
export class WhyWondrflyComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  blogUrl = environment.blogsUrl;
  userData: any = {};
  isLogin = false;
  data: any;
  title = 'Why Choose Us? - Wondrfly';
  constructor(private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private router: Router,
    private metaTagService: Meta,
    private apiservice :ApiService) {
    this.userData = JSON.parse(localStorage.getItem('CurrentUserWondrfly'));

    if (this.userData) {
      this.isLogin = true;
    }
  }

  gotoProfile() {
    this.router.navigate(["parent/profile", this.userData.id]);
  }


  // ------------------------------------------------get termsAndConditions  -------------------------------------------
  whyWonderflyData() {
    this.ngxLoader.start()
    axios.get(`${this.blogUrl}/why-wondrflies`).then(response => {
      this.ngxLoader.stop()
      this.data = response.data
    });
  }

  ngOnInit() {
    this.metaService()
    window.scroll(0, 0);
    this.whyWonderflyData()
  }
  metaService(){
    this.apiservice.getMetaServiceByPageName('why-wondrfly').subscribe(res=>{
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
            { name: 'description', content: 'Why choose Wondrfly? We strongly believe that right developmental activities can inspire a life-long love for adventure and curiosity among kids. Explore now!' }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'about wondrfly, wondrfly inc' }
          );  }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: 'Why choose Wondrfly? We strongly believe that right developmental activities can inspire a life-long love for adventure and curiosity among kids. Explore now!' }
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'about wondrfly, wondrfly inc,' }
        ); }
    })

  }
}


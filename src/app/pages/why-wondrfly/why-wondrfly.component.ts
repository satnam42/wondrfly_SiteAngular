import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-why-wondrfly',
  templateUrl: './why-wondrfly.component.html',
  styleUrls: ['./why-wondrfly.component.css']
})
export class WhyWondrflyComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  userData: any = {};
  isLogin = false;
  data: any;
  title = 'Why Choose Us? - Wondrfly';
  constructor(private ngxLoader: NgxUiLoaderService,
    private titleService: Title,
    private metaTagService: Meta,) {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    if (this.userData) {
      this.isLogin = true;
    }
  }


   // ------------------------------------------------get termsAndConditions  -------------------------------------------
   whyWonderflyData(){
    this.ngxLoader.start()
    axios.get(`${this.blogUrl}/why-wondrflies`).then(response => {
      this.ngxLoader.stop()
      this.data = response.data
   
      console.log( 'data on  whywonderfly', this.data);
    });
    }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Why choose Wondrfly? We strongly believe that right developmental activities can inspire a life-long love for adventure and curiosity among kids. Explore now!' }
    );

    window.scroll(0, 0);
    this.whyWonderflyData()
  }
 
}


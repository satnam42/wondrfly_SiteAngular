import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  private geoCoder;
    blogs:any
  searchBlog='';
  categories: any = [];
  keyword = 'name';
  selectedLocation="";
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  searchesCatg: any=[];
  blog: any=[];
  random: any;
  locations: any;
  item: any;
  data: any;
  term: string;
  title = 'Top Kid Friendly Blogs to Follow - Wondrfly';

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private router: Router
  ) {

    this.getBlog()
this.getCategory()
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Check out our Blog Section to read posts on trending kid's activities, child development, parenting and muh more. Also, don't miss Wondrfly's top blog posts." }
    );

    window.scroll(0, 0);
    }


searchCatg(data) {
  var name = data.categoryName;
  name = name.toLowerCase();
      name = name.replace(/ /g,"-");
      name = name.replace(/\?/g,"-");
      this.router.navigate(['blogs/category/',name, data.id])
}

// ------------------------------------------------get blogs  -------------------------------------------


getBlog(){
  this.ngxLoader.start()
  const responcee = axios.get(`${this.blogUrl}/blogs`).then(response => {
    this.blog = response.data
    this.blog.reverse()
    this.ngxLoader.stop()
    // this.random = this.blog[Math.floor(Math.random() * this.blog.length)]
  });
  }

// ------------------------------------------------get category  -------------------------------------------

  getCategory(){
    const responcee = axios.get(`${this.blogUrl}/categories`).then(response => {
      this.categories = response.data
      this.categories[0].blogs.reverse()
      this.categories[1].blogs.reverse()
      this.categories[2].blogs.reverse()
      this.categories[3].blogs.reverse()
      this.categories[4].blogs.reverse()
    });
    }

    // ------------------------------------------------get category  -------------------------------------------

  // getLocation(){
  //   const responcee = axios.get(`${this.blogUrl}/locations`).then(response => {
  //     this.locations = response.data
  //   });
  //   }

    setBlog(data){
      var title = data.title;
      title = title.toLowerCase();
      title = title.replace(/ /g,"-");
      title = title.replace(/\?/g,"-");
      this.router.navigate(['blogs/',title, data.id])
    }

  }



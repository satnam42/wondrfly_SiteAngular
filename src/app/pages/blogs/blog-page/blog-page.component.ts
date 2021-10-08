
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/main_bg.png';
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
    this.metaTagService.addTag(
      { name: 'keywords', content: 'kids activities blog,blogs for kids, kids friendly blogs,kids activity blog'}
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
  const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&_start=0&_limit=4`).then(response => {
    this.blog = response.data
    console.log('response',response)
    console.log(this.blog)
    // this.blog.reverse()
    this.ngxLoader.stop()
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


    setBlog(data){
      var title = data.title;
      title = title.toLowerCase();
      title = title.replace(/ /g,"-");
      title = title.replace(/\?/g,"-");
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['blogs/',title, data.id])
      );
      window.open(url, '_blank');
    }

  }



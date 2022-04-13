import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css']
})
export class BlogSearchComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  private geoCoder;
  blogs: any;
  searchBlog = '';
  categories: any;
  keyword = 'name';
  selectedLocation = "";
  searchesCatg: any = [];
  searchCatgData: any;
  isMostViewed: boolean = false;
  blog: any;
  location: any;
  blogsByLocation: any;
  catg: any;
  blogsBycatg: any;
  blogArray: any = [];

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private activatedroute: ActivatedRoute,
    private metaTagService: Meta
  ) {

    this.activatedroute.params.subscribe(data => {
      this.catg = data;
    })
    this.getBlogByCat()
  }

  ngOnInit() {
    this.metaTagService.addTag(
      { name: 'keywords', content: 'blog category filter, blog category page, search blogs,blog topics for kids' }
    );
    window.scroll(0, 0);

  }

  // ------------------------------------------------search categories functionality----------------------------------

  selectEvent(item) {
    this.router.navigate(['/blogs/blog-result'])
  }

  onFocused(e) {
    // do something when input is focused
  }

  onChangeSearch(key: string) {

    this.apiservice.searchCategory(key).subscribe((res: any) => {
      this.searchesCatg = res.data;

    });
  }



  getBlogByCat() {
    const responcee = axios.get(`${this.blogUrl}/categories/?id=${this.catg.id}`).then(response => {
      this.searchCatgData = response.data[0]
      this.blogArray = this.searchCatgData.blogs
      this.blogArray = this.blogArray.sort((val1, val2) => new Date(val2.created_at).getTime() - new Date(val1.created_at).getTime());
      this.isMostViewed = false
    });
  }
  mostViewed() {
    let empty: any;
    this.ngxLoader.start();
    // const responcee = axios.get(`${this.blogUrl}/blogs`).then((response: any) => {
    // this.ngxLoader.stop();
    let i = 0;
    let blogs: any = [];
    this.searchCatgData.blogs.forEach(blog => {
      i++;
      blogs.push(blog);
      blogs.sort((a, b) => (a.views < b.views) ? 1 : (a.views < b.views) ? ((a.views < b.views) ? 1 : -1) : -1);
      this.blogArray = blogs.filter(this.onlyUnique);
    });
    this.isMostViewed = true
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  setBlog(data) {
    var title = data.title;
    title = title.toLowerCase();
    title = title.replace(/ /g, "-");
    title = title.replace(/\?/g, "-");
    this.router.navigate(['blogs/', title, data.id])
  }

}

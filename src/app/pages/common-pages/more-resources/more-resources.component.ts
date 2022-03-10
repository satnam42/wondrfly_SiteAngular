import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Program } from 'src/app/core/models';
@Component({
  selector: 'app-more-resources',
  templateUrl: './more-resources.component.html',
  styleUrls: ['./more-resources.component.css']
})
export class MoreResourcesComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/main_bg.png';
  blogUrl = environment.blogsUrl;
  commentForm: FormGroup;
  resources: any;
  blogs: any
  searchBlog = '';
  categories: any = [];
  blog: any = [];
  blogDetail: any;
  title: string = "";
  blogbyid: any;
  programs: any = new Program;
  constructor(
    private router: Router,
    private metaTagService: Meta,
    private ngxLoader: NgxUiLoaderService,
    private apiservice: ApiService,
    private titleService: Title,) {
    this.getBlog()
    this.getCategory()
    this.getPrintables()
  }


  // ------------------------------------------------get resources  -------------------------------------------

  getPrintables() {
    axios.get(`${this.blogUrl}/printables?_sort=published_at:DESC`).then(response => {
      this.resources = response.data
      console.log('resources', this.resources)
    });
  }

  downloadFile(file) {
    FileSaver.saveAs(this.blogUrl + file.url, file.name);
  }
  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPrograms();
    this.getBlog();
    this.commentForm = new FormGroup({
      content: new FormControl(''),
      firstName: new FormControl(''),
      email: new FormControl('')
    });
  }
  getPrograms() {
    this.apiservice.getPublishedProgram(1, 6, 'published').subscribe((res: any) => {
      this.programs = res.items;
    })
  }

  searchCatg(data) {
    var name = data.categoryName;
    name = name.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/\?/g, "-");
    this.router.navigate(['blogs/category/', name, data.id])
  }
  setBlog(data) {
    var title = data.title;
    title = title.toLowerCase();
    title = title.replace(/ /g, "-");
    title = title.replace(/\?/g, "-");
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['blogs/', title, data.id])
    );
    window.open(url, '_blank');
  }
  // ------------------------------------------------get blogs  -------------------------------------------
  getBlog() {
    this.ngxLoader.start()
    const responcee = axios.get(`${this.blogUrl}/blogs?_sort=published_at:DESC&_start=0&_limit=4`).then(response => {
      this.blog = response.data
      console.log('response', response)
      console.log(this.blog)
      // this.blog.reverse()
      this.ngxLoader.stop()
    });
  }

  // ------------------------------------------------get category  -------------------------------------------

  getCategory() {
    const responcee = axios.get(`${this.blogUrl}/categories`).then(response => {
      this.categories = response.data
      this.categories[0].blogs.reverse()
      this.categories[1].blogs.reverse()
      this.categories[2].blogs.reverse()
      this.categories[3].blogs.reverse()
      this.categories[4].blogs.reverse()
    });
  }
  setBlogg(data) {
    window.scroll(0, 0);
    var title = data.title;
    title = title.toLowerCase();
    title = title.replace(/ /g, "-");
    title = title.replace(/\?/g, "-");
    this.router.navigate(['blogs/', title, data.id])
    this.blogDetail = data;
    this.getBlogById();
  }
  getBlogById() {
    const responcee = axios.get(`${this.blogUrl}/blogs/?id=${this.blogDetail.id}`).then(response => {
      this.blogbyid = response.data[0]
      this.title = this.blogbyid.title
      this.titleService.setTitle(this.blogbyid.metaTitle + '- wondrfly');
      var desc = this.blogbyid.metaDesc.substr(0, 165)
      this.metaTagService.updateTag(
        { name: 'description', content: desc + '...' }
      );
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Globals } from 'src/app/core/common/imageLoader';
import axios from 'axios'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthsService } from 'src/app/core/services/auths.service';

import { Program, User } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/main_bg.png';
  commentForm: FormGroup;
  blogUrl = environment.blogsUrl;
  blogDetail:any;
  blogs:any;
  indx:number;
  blog: any;
  baseUrl= environment.baseUrl;
commentsData : any = {
  content:'',
}
commentCollapsed:boolean = false;
title:string = ""

  blogbyid: any;
  user= new User;
  url: string;
  share: any ={
    title:''
  };
  shareUrl:string;
  shareUrlSocial = environment.baseUrl;
  programs:any = new Program;
  constructor(
    public auths: AuthsService,
    private titleService: Title,
    private metaTagService: Meta,
    private toastr: ToastrService,
    private apiservice: ApiService,
    private router: Router,
    private activatedroute: ActivatedRoute)
     {

    this.user = this.auths.currentUser()
    this.activatedroute.params.subscribe(data => {
      this.blogDetail=data;
      this.getBlogById();
      this.addMostViewCount();    })
    }

  ngOnInit() {
    window.scroll(0, 0);
    this.getPrograms();
    this.getBlog();
    this.commentForm = new FormGroup({
      content: new FormControl(''),
      firstName: new FormControl(''),
      email: new FormControl('')
    });
  }


  goToCategory(data) {
    var name = data.categoryName;
    name = name.toLowerCase();
        name = name.replace(/ /g,"-");
        name = name.replace(/\?/g,"-");
        this.router.navigate(['blogs/category/',name, data.id])
  }

// ------------------------------------------------get blogsById  -------------------------------------------
getBlogById(){
  const responcee = axios.get(`${this.blogUrl}/blogs/?id=${this.blogDetail.id}`).then(response => {
    this.blogbyid = response.data[0]
    this.title = this.blogbyid.title
    this.titleService.setTitle(this.blogbyid.metaTitle+ '- wondrfly');
    var desc = this.blogbyid.metaDesc.substr(0,165)
    this.metaTagService.updateTag(
      { name: 'description', content: desc+'...'}
    );
  });
  }

  // ------------------------------------------------get blogs  -------------------------------------------
getBlog(){
  axios.get(`${this.blogUrl}/blogs?_start=5&_limit=8`).then(response => {
    this.blog = response.data
  });
  }

  // ------------------------------------------------POST COMMENT ON blogs  -------------------------------------------
  postComment(){
    if(localStorage.getItem('token')===null){
      this.toastr.warning('Please Login or Signup to comment')
      window.document.getElementById("modal").click();
    }else
    this.getBlogById()
    fetch(`${this.blogUrl}/blogs/${this.blogDetail.id}/comment`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
       content: this.commentsData.content
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data)
      );
      this.getBlogById()
      this.commentForm.reset()
}
genericSocialShare(provider) {
  this.share.title = this.blogbyid.title.toLowerCase();
  this.share.title = this.blogbyid.title.replace(/ /g,"-");
  this.share.title = this.blogbyid.title.replace(/\?/g,"-");
     switch (provider) {
       case 'facebook': {
         this.url = `https://www.${provider}.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrlSocial)}blogs/${this.share.title}/${this.blogbyid.id}`;
         window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }
       case 'email': {
         this.url = `mailto:?subject=wondrfly&amp;body=${encodeURIComponent(this.shareUrlSocial)}blogs/${this.share.title}/${this.blogbyid.id}`;
         window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }
       case 'instagram': {
         this.url = `https://api.${provider}.com/send?text=${encodeURIComponent(this.shareUrlSocial)}blogs/${this.share.title}/${this.blogbyid.id}`;
         window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }

     }

    }
      getPrograms(){
        this.apiservice.getPublishedProgram(1,6, 'published').subscribe((res:any)=> {
          this.programs = res.items;
        })
      }
    setBlog(data){
      window.scroll(0,0);
      var title = data.title;
      title = title.toLowerCase();
      title = title.replace(/ /g,"-");
      title = title.replace(/\?/g,"-");
      this.router.navigate(['blogs/',title,data.id])
      this.blogDetail = data;
      this.getBlogById();
    }

  goToProgramDetail(data) {
    data.name = data.name.replace(/ /g,"-");
    this.router.navigate(['program', data.name,data._id]);
  }
  addMostViewCount(){
    const responcee = axios.patch(`${this.blogUrl}/blogs/view/${this.blogDetail.id}`).then(response => {
    });
    }

}

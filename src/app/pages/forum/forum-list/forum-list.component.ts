import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: any;
  pageNo: number = 1;
  pageSize: number;
  SearchValue = '';
  role: any = '';
  constructor(private router: Router,
    private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.role = params['id'];
    });

  }

  forum(data) {
    this.router.navigate(['forum/forum', data._id]);

  }
  forumListByRole() {
    this.pageSize = 200;
    this.ngxLoader.start();
    this.apiservice.forumListByRole(this.role).subscribe(res => {
      this.ngxLoader.stop();
      this.forums = res;
      console.log('forum list>>>>>>', this.forums);
    });
  }
  forumSearch() {
    this.ngxLoader.start();
    this.apiservice.forumSearch(this.SearchValue, this.role).subscribe(res => {
      this.ngxLoader.stop();
      this.forums = res;
      console.log('forum list by search>>>>>>', this.forums);
    });
  }
  ngOnInit() {
    this.forumListByRole()

    window.scroll(0, 0);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service.service';


@Component({
  selector: 'forum-type',
  templateUrl: './forum-type.component.html',
  styleUrls: ['./forum-type.component.css']
})
export class ForumTypeComponent implements OnInit {
  forums: any;
  pageNo: number = 1;
  pageSize: number;
  SearchValue = '';
 
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader:NgxUiLoaderService
  ) { 
    this.setTimer()
  }

  forum(role: string) {
    this.router.navigate(['forum/forum-list', role]);

  }

  public setTimer(){
         console.log('consttttt')
    // set showloader to true to show loading div on view
    this.ngxLoader.start()   
    // this.timer        = Observable.timer(5000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.ngxLoader.stop() 
    });
  }


  ngOnInit() {
 
    window.scroll(0, 0);
  }

}

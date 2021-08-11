import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from 'src/app/core/services/api.service.service';
import { Child, User } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: "app-children",
  templateUrl: "./children.component.html",
  styleUrls: ["./children.component.css"],
})
export class ChildrenComponent implements OnInit {
  kids = new Child;
  currentUser = new User;
  constructor(private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService) {
    this.activatedRoute.params.subscribe(params => {
      this.currentUser.id = params['id'];
      this.getChildren()
    });
  }
  getChildren() {
    this.ngxLoader.start();
    this.apiservice.getChildByGuardianId(this.currentUser.id).subscribe((res: any) => {
      this.ngxLoader.stop();
      this.kids = res;
    });
    this.ngxLoader.stop();
  }
  ngOnInit() {
    this.getChildren();
  }
}
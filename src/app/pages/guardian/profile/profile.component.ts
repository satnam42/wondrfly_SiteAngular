import { Component, OnInit } from "@angular/core";
import { ApiService } from 'src/app/core/services/api.service.service';
import { User } from 'src/app/core/models';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: "guardian-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  currentUser = new User;
  message: string = 'Updated!';
  constructor(private apiservice: ApiService,
    private activatedRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private toastyService: ToastyService,) {
    this.activatedRoute.params.subscribe(params => {
      this.currentUser.id = params['id'];
      this.getUserById()
    });
  }
  getUserById() {
    this.apiservice.getUserById(this.currentUser.id).subscribe((res: any) => {
      this.currentUser = res.data;
    });
  }
  updateUser() {
    this.ngxLoader.start();
    this.apiservice.updateGuardian(this.currentUser).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.isSuccess) {
        this.toastyService.success({ title: '', msg: this.message })
      }
      else {
        this.toastyService.error({ title: '', msg: res.error })
      }
    });
  }
  ngOnInit() { }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ApiService } from 'src/app/core/services/api.service.service';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ["./guardian.component.css"],
})
export class GuardianComponent implements OnInit {
  currentUser: any = new User;
  fileData: File = null;
  profileProgress: 0;
  isSideBar: boolean = true;
  @ViewChild(HeaderComponent, { static: true })
  headerComponent: HeaderComponent;
  constructor(private auth: AuthsService,
    private apiservice: ApiService,
    private router: Router) {
    this.currentUser = auth.currentUser();
    if (this.currentUser) {
      this.getUserById();
    }
  }
  goTo(url: string) {
    switch (url) {
      case 'profile':
        this.router.navigate(['guardian/', url, this.currentUser.id]);
        break;
      case 'children':
        this.router.navigate(['guardian/', url, this.currentUser.id]);
        break;
    }
  }
  sideBar() {
    this.isSideBar = !this.isSideBar;
  }
  getUserById() {
    this.apiservice.getUserById(this.currentUser.id).subscribe((res: any) => {
      this.currentUser = res.data;
      localStorage.setItem('userData', JSON.stringify(this.currentUser));
    });
  }

  getProfileProgress() {
    this.apiservice
      .getProfileProgress(this.currentUser.id, this.currentUser.role)
      .subscribe((res: any) => {
        this.profileProgress = res.profileProgress;
      });
  }
  guardianImageSelect(event, id) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    this.apiservice.uploadUserImage(id, formData).subscribe((res: any) => {
      if (res) {
        this.getUserById();
        this.headerComponent.getUserById();
        this.headerComponent.getProfileProgress();
      }
    });
  }
  ngOnInit() {
    this.getProfileProgress();
  }
}

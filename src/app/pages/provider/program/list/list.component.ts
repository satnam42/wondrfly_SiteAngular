import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Program, User } from 'src/app/core/models';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  pageNo = 1;
  pageSize = 20;
  message: string = '';
  action: boolean = true;
  isScrol: boolean = true;
  loaderPostion = "center-center"
  loaderType = "ball-spin-clockwise"
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  userData: any = new User;
  programs = new Program;
  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
  ) {

    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);
  }

  onScroll() {
    if (this.isScrol) {
      this.isScrol = false
      this.loadMore()
    }
  }

  addProgram() {
    if (this.userData.phoneNumber == '' || this.userData.addressLine1 == '' || this.userData.avatarImages == '') {
      // this.toasty.warning("you need to complete  your profile before adding new program!");
    }
    else { this.router.navigate(['/program/add']); }
  }
  programDetail(data) {
    if (data.user === this.userData.id) {
      this.router.navigate(['program/detail', data._id]);
    }
  }
  programPublishUnpublish(program, indx) {
    if (program.name == '' || program.name == "string" || program.type == '' || program.type == "string"
      || program.description == '' || program.description == "string" || program.date.from == '' || program.date.from == "string"
      || program.location == '' || program.location == "string"
      || program.ageGroup.from == '' || program.ageGroup.from == "string") {
      // this.toasty.warning("you need to complete  program before publish it!");
    }
    else {
      if (this.programs[indx].isPublished) {
        this.programs[indx].isPublished = false
      }
      else if (!this.programs[indx].isPublished) {
        this.programs[indx].isPublished = true
      }
      this.apiservice.programPublishUnpublish(program._id, this.programs[indx].isPublished).subscribe(res => {
      });
    }
  }

  getProviderProgram = async () => {
    this.ngxLoader.start();
    await this.apiservice.getProgramByProvider(this.userData.id, this.pageNo, this.pageSize).subscribe((res) => {
      this.programs = res
      console.log('provider programs',this.programs)
      this.ngxLoader.stop();
    });
  }

  loadMore() {
    this.pageSize += 20
    this.getProviderProgram();
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getProviderProgram();
  }

}





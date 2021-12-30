﻿import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from 'src/app/pages/search/search.component';
import { environment } from 'src/environments/environment';
import { Globals } from '../../common/imageLoader';
import { Category, Child, User } from '../../models';
import { ApiService } from '../../services/api.service.service';
import { DataService } from '../../services/dataservice.service ';
@Component({
  selector: 'online-programs',
  templateUrl: './online-programs.component.html',
  styleUrls: ['./online-programs.component.css']
})
export class OnlineProgramsComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  selectedProgram:any;
  isDateFilter: boolean = false;
  isTimeFilter: boolean = false;
  isAgeFilter: boolean = false;
  isChildFilter: boolean = false;
  isPriceFilter: boolean = false;
  isOpenFilter: boolean = false;
  isSavedFilter: boolean = false;
  isCategoryFilter: boolean = false
  isDateModal: boolean = false;
  isTimeModal: boolean = false;
  isAgeModal: boolean = false;
  isChildModal: boolean = false;
  isPriceModal: boolean = false;
  isCategoryModal: boolean = false;
  isFav: boolean = false;
  categoryId: any = ''
  activityName: any = ''
  rating: any;
  activityDate: any
  filterData: any = {
    categoryId: '',
  }

  favPrograms: any;
  isMap: boolean = true;
  kids = new Child;
  categoriesBySearch : any = new Category;
  providersBySearch : any= new User;
  userData: any = {};
  programList: any;
  // totalPages: number;
  filterClass: boolean = false;
  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 8;
  @Input() programs: any=[];
  @Input() categories: any=[];
  randomNumber:any = 0;
  isLogin: Boolean = false;
  key: string = '';
  providerRole: boolean = false;
  parentRole: boolean = false;
  favProgramRes: any;
  keyword = 'name';
  searchKey = '';
  isSearched = false;
  isScrol= true;
  fav: any = {
    userId: '',
    programId: '',
  };
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  favourites: any = [];
  facebookActive = ''
  messengerActive = ''
  emailActive = ''
  whatsappActive = ''
  copylinkActive = ''
  totalRating:any = '';
  // ng5slider end
  showReset = false;
  deleteProgramRes: any;
  baseUrl= environment.baseUrl;
  shareUrl:string;
  programOwnerData:any = User
  isOnline:boolean = false;
  isInPerson:boolean = true;
  @Input() contentLoaded:boolean;
  fakeLoaderData = [1,2,3,4,5]
  @ViewChild(SearchComponent, { static: true }) searchComponent: SearchComponent;
  constructor( public imageLoader: Globals,
    private apiservice: ApiService,
    private router : Router,
    private dataService: DataService) {
      var retrievedObject = localStorage.getItem('CurrentUserWondrfly');
      this.userData = JSON.parse(retrievedObject);
      if (this.userData) {
        this.isLogin = true;
        if (this.userData.role === 'provider') {
          this.providerRole = true;
          this.parentRole = false;
        }
        if (this.userData.role === 'parent') {
          this.parentRole = true;
          this.providerRole = false;
        }
      }
  }
  ngOnInit() {
    console.log(this.programs,'programs')
}
   addAction(programId) {
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

  addFavProgram(userId, programId, index) {
    this.programs[index].isFav = true;
    this.fav.userId = userId;
    this.fav.programId = programId;
    this.apiservice.addFavProgram(this.fav).subscribe(res => {
      this.favProgramRes = res;
    });
  }

  deleteFavProgram(favId, index) {
    this.programs[index].isFav = false;
    this.apiservice.deleteFavProgram(favId).subscribe(res => {
      this.deleteProgramRes = res;
    });
  }

   goToProgramDetail(data) {
    if (this.parentRole) {
      this.addAction(data._id);
    }
    let name=data.name.toLowerCase();
     name = name.replace(/ /g,"-");
    this.router.navigate(['program', name,data._id]);
  }

   // ---------------------------------navigate to program detail page -------------------------------------------
getRating(program){
  if(program.userId==''|| program.userId==undefined || !program.userId){ program.userId=program.user }
    this.apiservice.getUserRating(program.userId).subscribe((res:any) => {
       this.rating = res
       this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
     });
   }

   setCategoryId(e) {
      this.filterData.categoryId = e
      this.dataService.setOption(this.filterData)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/search']))

    }


// ---------------------suggested sub categories by sub catids -----------------------

}

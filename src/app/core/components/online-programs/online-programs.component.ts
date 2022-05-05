import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from 'src/app/pages/search/search.component';
import { environment } from 'src/environments/environment';
import { Globals } from '../../common/imageLoader';
import { Category, Child, User } from '../../models';
import { ApiService } from '../../services/api.service.service';
import { AuthsService } from '../../services/auths.service';
import { DataService } from '../../services/dataservice.service ';
@Component({
  selector: 'online-programs',
  templateUrl: './online-programs.component.html',
  styleUrls: ['./online-programs.component.css']
})
export class OnlineProgramsComponent implements OnInit {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  errorImage = 'assets/favicon.svg';
  selectedShareData:any;
  isFav: boolean = false;
  categoryId: any = ''
  activityName: any = ''
  rating: any;
  filterData: any = {
    categoryId: '',
  }
  userData: any = {};
  markerUrl = 'assets/location.svg';
  @Input() provider_programs: any=[];
  @Input() categories: any=[];
  @Input() suggested: any=[];
  isLogin: Boolean = false;
  key: string = '';
  parentRole: boolean = false;
  favProgramRes: any;
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
  upArrow2: boolean = false;
  currentUser: any;
  constructor( public imageLoader: Globals,
    private apiservice: ApiService,
    private router : Router,
    private auth: AuthsService,
    private dataService: DataService) { 
      if( auth.currentUser()){
        this.isLogin=true;
        this.userData=auth.currentUser();
      }
  }
  ngOnInit() {
}

scrollLeft(i){
  document.getElementById('widgetsOnline'+i).scrollLeft -= 650;
}

scrollRight(i){
  document.getElementById('widgetsOnline'+i).scrollLeft += 650;
}
goToProviderProfile(provider) {
  var providerName = provider.firstName;
  providerName = providerName.toLowerCase();
  providerName = providerName.replace(/ /g, "-");
  providerName = providerName.replace(/\?/g, "-");
  this.router.navigate(['/provider/program-provider', providerName, provider._id]);
}
addFavProgram(userId, programId, providerIndx,programIndx) {
  this.provider_programs[providerIndx].programs[programIndx].isFav = true;
  this.fav.userId = userId;
    this.fav.programId = programId;
    this.apiservice.addFavProgram(this.fav).subscribe(res => {
      this.favProgramRes = res;
    });
  }

  deleteFavProgram(favId, providerIndx,programIndx) {
    this.provider_programs[providerIndx].programs[programIndx].isFav = false;
    this.apiservice.deleteFavProgram(favId).subscribe(res => {
      this.deleteProgramRes = res;
    });
  }
  goToProgramDetail(data) {
    if (this.parentRole) {
      this.addAction(data._id);
    }
    var programName = data.name;
    programName = programName.toLowerCase();
    programName = programName.replace(/ /g, "-");
    programName = programName.replace(/\?/g, "-");
    this.router.navigate(['program', programName, data._id]);
  }
  addAction(programId) {
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }
   // ---------------------------------navigate to program detail page -------------------------------------------
getRating(id){
    this.apiservice.getUserRating(id).subscribe((res:any) => {
       this.rating = res
       this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)
     });
   }

   setCategoryId(e) {
      this.filterData.subcatId = e.id
      this.filterData.searchedCategoryKey = e.name
      this.dataService.setOption(this.filterData)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/search']))

    }

}

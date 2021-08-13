import { Options } from '@angular-slider/ngx-slider';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Globals } from '../../common/imageLoader';
import { Category, Child, User } from '../../models';
import { ApiService } from '../../services/api.service.service';
@Component({
  selector: 'online-programs',
  templateUrl: './online-programs.component.html',
  styleUrls: ['./online-programs.component.css']
})
export class OnlineProgramsComponent implements OnInit {
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
  filterData: any = {}
  favPrograms: any;
  isMap: boolean = true;
  kids = new Child;
  categories = new Category;
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
  randomNumber:any = 0;
  isLogin: Boolean = false;
  key: string = '';
  providerRole: boolean = false;
  parentRole: boolean = false;
  favProgramRes: any;
  keyword = 'name';
  searchKey = '';
  isSearched = false;
  isScrol
    = true;
  fav: any = {
    userId: '',
    programId: '',
  };
  searchedPrograms: any = [];
  searchedProgram: any = [];
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  fromDate: any;
  toDate: any;
  fromTime: any;
  toTime: any;
  minPrice: any = 50;
  maxPrice: any = 250;
  favourites: any = [];
  facebookActive = ''
  messengerActive = ''
  emailActive = ''
  whatsappActive = ''
  copylinkActive = ''
  durationMin: number = 20
  durationMax: number = 30
  totalRating:any = '';

  //  ng5slider start age group
  minAge: number = 3;
  maxAge: number = 10;
  ageOption: Options = {
    floor: 0,
    ceil: 21,
    translate: (value: number): string => {
      return value + ' YRS';
    }
  };

   priceOption: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number): string => {
      return value + ' $';
    }
  };

  durationOption: Options = {
    floor: 0,
    ceil: 60,
    translate: (value: number): string => {
      return value + ' HOUR';
    }
  };


  // ng5slider end
  showReset = false;
  deleteProgramRes: any;
  title = 'Search for Online Classes and Programs - Wondrfly';
  latitude: number = 40.5682945;
  longitude: number = -74.0409239;
  center = {
    latitude: this.latitude,
    longitude: this.longitude
  }
  zoom: number;
  address: string;
  private geoCoder;
  user = new User
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  recentSearch: any;
  shareUrlSocial = environment.shareUrl;
  baseUrl= environment.baseUrl;
  shareUrl:string;
  selectedProgramId: string;
  url: string;
  suggested: any =[];
  programOwnerData:any = User
  isOnline:boolean = false;
  isInPerson:boolean = true;

  constructor( public imageLoader: Globals,
    private apiservice: ApiService,
    private router : Router,
    private ngxLoader : NgxUiLoaderService) {
  }
  ngOnInit() {
    this.suggestedProgramss();
}



genericSocialShare() {

  this.shareUrl=`${this.shareUrlSocial}program/detail/${this.selectedProgramId}`;
  console.log('share url ',this.shareUrl)
 //  this.metaTagService.updateTag(
 //   { property: 'og:url', content: this.shareUrl  },
 // );
     // switch (provider) {
     //   case 'facebook': {
     //     this.url = `https://www.${provider}.com/sharer/sharer.php?u=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
     //     window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
     //     return true;
     //   }
     //   case 'email': {
     //     this.url = `mailto:?subject=wondrfly&amp;body=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
     //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
     //     return true;
     //   }
     //   case 'whatsapp': {
     //     this.url = `https://api.${provider}.com/send?text=${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
     //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
     //     return true;
     //   }
     //   case 'messenger': {
     //     this.url = `https://fb-messenger://share/?link=${encodeURIComponent(this.baseUrl)}&app_id=123456789`;
     //     window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
     //     return true;
     //   }
     //   case 'copylink': {
     //     this.url = `${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;

     //   }

     // }
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
    data.name = data.name.replace(/ /g,"-");
    this.router.navigate(['program', data.name,data._id]);
  }

   // ---------------------------------navigate to program detail page -------------------------------------------
getRating(program){
  if(program.userId==''|| program.userId==undefined || !program.userId){ program.userId=program.user }
    this.apiservice.getUserRating(program.userId).subscribe((res:any) => {
       this.rating = res
       this.rating.finalAverageRating = parseFloat(String(this.rating.finalAverageRating)).toFixed(1)

       console.log('ratinggggggggggggg', res)
     });
   }

   getPublishedProgram() {
    this.activityName = ''
    this.activityDate = undefined
    this.showReset = false
    if (this.isSearched) {
      this.programs = this.searchedProgram;
    } else {
      this.ngxLoader.start()
      this.apiservice.getPublishedProgram(this.pageNo, this.pageSize, 'published').subscribe(res => {
        this.programList = res;
        this.ngxLoader.stop()
        console.log('programs', res);
        if (this.programList.items) {
          this.programs = this.programList.items;
          this.isScrol = true;
        }
      });
    }
    this.ngxLoader.stop()
  }

   suggestedProgramss(){
    this.categoryId='60b47687bb70a952280bfa7b'
    var filter = `categoryId=${this.categoryId}`
    this.apiservice.programFilter(filter, this.pageNo, this.pageSize).subscribe((res: any) => {
      this.suggested = res.data
      console.log('suggested', this.suggested);
    })

}

}

import { Component, OnInit, ViewChild,Pipe, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/core/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Program, Category } from 'src/app/core/models';
import { Claim } from 'src/app/core/models/claim.model';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
// import { ParentProfileComponent } from '../../parent/parent-profile/parent-profile.component';


@Pipe({
  name: "phones"
})
export class PhonePipe {
  transform(rawNum:string) {
    rawNum = "+1"+ rawNum;

    const countryCodeStr = rawNum.slice(0,2);
    const areaCodeStr = rawNum.slice(2,5);
    const midSectionStr = rawNum.slice(5,8);
    const lastSectionStr = rawNum.slice(8);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  isScrol: boolean = true;
  pageNo = 1;
  pageSize = 20;
  isGenOverview = true;
  isPeople = false;
  isActivities = false;
  isList: boolean= false;
  isGrid: boolean=true;
  peopleClass = '';
  activityClass = '';
  parentRole: boolean = false;
  overviewClass = 'active';
  userUpdateForm: FormGroup;
  lat: number = 51.673858;
  lng: number = 7.815982;
  programs = new Program;
  message: string = 'Updated Successfully';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  isLogin = false;
  providerRole: boolean = false;
  claim = new Claim;
  program = new Program;
  user = new User;
  profileProgressResponse: any = {};
  updateResponse: any = {};
  formData = new FormData();
  fileData: File = null;
  imagePath;
  msg: string;
  usersData: any = {};
  badgeList: any = [];
  badgesList: any = [];
  badges: any = [];
  userResponse: any
  skills: any = [];
  categories: any = new Category
  providerImgURL: any
  // ---------------autucomplete-------------  
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  categoryIds: [] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keyword = 'name';
  tags: any = [];
  @ViewChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;
  profileProgress: any;
  disposableMasksProvided;
  qrCodeRegistration;
  staffHealthAndHygieneProtocols;
  dailyEquipment;
  sanitizerStations;
  limitedClassSizes;
  parentObservation;
  health_safety = [
    { name: 'Disposable Masks Provided', img: 'assets/disposable_mask.svg', status: false, type: 'disposableMasksProvided' },
    { name: 'OR Code Registration', img: 'assets/qr_code.svg', status: false, type: 'qrCodeRegistration' },
    { name: 'Staff Health And Hygiene Protocols', img: 'assets/staf_health.png', status: false, type: 'staffHealthAndHygieneProtocols' },
    { name: 'Daily Equipment', img: 'assets/daily_eqpt.svg', status: false, type: 'dailyEquipment' },
    { name: 'Sanitizer Stations', img: 'assets/sanitizer.svg', status: false, type: 'sanitizerStations' },
    { name: 'Limited Class Sizes', img: 'assets/limited_class.svg', status: false, type: 'limitedClassSizes' },
    { name: 'Parent Observation', img: 'assets/parent_ob.svg', status: false, type: 'parentObservation' },

  ]
  health = [
    {
      disposableMasksProvided: false,
      qrCodeRegistration: false,
      staffHealthAndHygieneProtocols: false,
      dailyEquipment: false,
      sanitizerStations: false,
      limitedClassSizes: false,
      parentObservation: false

    }
  ]
  userData: any = new User;
  constructor(private router: Router,
    private apiservice: ApiService,
    
    private ngxLoader: NgxUiLoaderService) {
    var retrievedObject = localStorage.getItem('userData');
    this.user = JSON.parse(retrievedObject);
    if (this.user) {
      this.isLogin = true;
      if (this.user.role === "provider") {
        this.providerRole = true;
      }
      var retrievedObject = localStorage.getItem('userData');
      this.userData = JSON.parse(retrievedObject);
    }
  }
  onGenOverview() {
    window.scroll(0, 0);
    this.peopleClass = ''; this.activityClass = ''; this.overviewClass = 'active';
    this.isGenOverview = true; this.isPeople = false; this.isActivities = false;
  }
  onPeople() {
    window.scroll(0, 0);
    this.peopleClass = 'active'; this.activityClass = ''; this.overviewClass = '';
    this.isGenOverview = false; this.isPeople = true; this.isActivities = false;
  }
  onActivities() {
    window.scroll(0, 0);
    this.peopleClass = ''; this.activityClass = 'active'; this.overviewClass = '';
    this.isGenOverview = false; this.isPeople = false; this.isActivities = true
    this.getProviderProgram()
  }

  claimBusiness() {
    console.log('msg')
    if (this.user && this.user.role === 'provider') {
      this.claim.status = "in-progress";
      this.claim.requestBy = this.user.id;
      this.claim.requestOn = this.program.user;
      this.ngxLoader.start();
      this.apiservice.claimRequest(this.claim).subscribe(res => {
        // this.toastyService.info({ title: 'Info', msg: this.message })
        // this.snack.open(this.message, 'OK', { duration: 4000 });
        this.ngxLoader.stop();

      }); this.ngxLoader.stop();
    } else if (this.user && this.user.role === 'parent') {
      this.ngxLoader.start();
      let msg = 'please  register or login as provider to claim this business!';
      // this.toastyService.info({ title: 'Info', msg: msg })
      this.router.navigate(['/login']);
      this.ngxLoader.stop();
    }
    this.ngxLoader.start();
    let msg = 'please login to claim this business and try again!'
    // this.toastyService.info({ title: 'Info', msg: msg })
    console.log(msg)
    this.router.navigate(['/login']);
    this.ngxLoader.stop();
  } 


  providerImageSelect(event) {
    this.fileData = event.target.files[0];
    this.formData.append('image', this.fileData);
    // --------------------preview image before upload ------------------------
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.providerImgURL = reader.result;
    };
    // -------------------------------------------------------------------------------
  }
  providerImageUpdate(id) {
    this.ngxLoader.start()
    this.apiservice.uploadUserImage(id, this.formData).subscribe((res: any) => {
      this.ngxLoader.stop()
      // if (res.isSuccess===true) {
      this.user.avatarImages = this.providerImgURL
      this.headerComponent.getUserById()
      // } 
      // else { this.toastyService.error({ title: 'Error', msg: 'something went wrong, please try again Later!' }) }
    });
    this.ngxLoader.stop();
  }

  upDateHealthMeasure(type, indx) {
    if (this.user.healthAndSafety.length > 0) {
      this.health = this.user.healthAndSafety;
    }
    if (this.health_safety[indx].status === false) {
      this.health_safety[indx].status = true
    }
    else if (this.health_safety[indx].status = true) {
      this.health_safety[indx].status = false
    }
    for (let i in this.health) {
      let _typeof = Object.keys(this.health[i])
      _typeof.forEach(e => {
        if (type == e) {
          let healthType = this.health[0]
          healthType[type] = this.health_safety[indx].status
          this.user.healthAndSafety[0] = healthType
        }
      });
    }
    this.apiservice.updateProviderById(this.user.id, this.user).subscribe((res: any) => {
      if (res.isSuccess) {
        // this.user=res.data
      }
    });
  }
  updateProviderById(id) {
    this.ngxLoader.start();
    console.log('beforeeeeeeeeeeee>>>', this.user)
    this.apiservice.updateProviderById(this.user.id, this.user).subscribe((res: any) => {
      console.log('provider updated', res)
      this.ngxLoader.stop();
      if (res) {
        localStorage.setItem('userData', JSON.stringify(this.user));
        // this.toastyService.info({ title: 'Info', msg: this.message })
        this.headerComponent.getUserById()
      } else {
        this.ngxLoader.stop();
        // this.toastyService.info({ title: 'Info', msg: res.error })
      }
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }
  getProviderById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
      this.providerImgURL = this.user.avatarImages
      console.log('provider>>>>>>>>>>>',this.user)
      this.user.healthAndSafety.forEach(health => {
        if (health.disposableMasksProvided) { this.health_safety[0].status = true; }
        if (health.qrCodeRegistration) { this.health_safety[1].status = true; }
        if (health.staffHealthAndHygieneProtocols) {
          this.health_safety[2].status = true;
        }
        if (health.dailyEquipment) {
          this.health_safety[3].status = true;
        }
        if (health.sanitizerStations) {
          this.health_safety[4].status = true;
        }
        if (health.limitedClassSizes) {
          this.health_safety[5].status = true;
        }
        if (health.parentObservation) {
          this.health_safety[6].status = true;
        }
        
      })
      this.getCategoryList();
    });
  }

  getProfileProgress() {
    this.apiservice.getProfileProgress(this.user.id, this.user.role).subscribe((res: any) => {
      this.profileProgress = res.profileProgress.toString()
      console.log('progresss', this.profileProgress)
    });
  }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.user.interests.push(event.option.value);
  // }

  remove(t: string): void {
    const index = this.user.interests.indexOf(t);

    if (index >= 0) {
      this.user.interests.splice(index, 1);
    }
    console.log('remove intrest', this.user.interests)
  }

  // remove(indx): void {
  //   this.skills.splice(indx, 1);
  // }
  selectEvent(id) {
    this.categories.forEach(category => {
      if(category.id==id){
        category._id = category.id;
        this.user.interests.push(category);
        return id.name;
      }
    });
}
  // onFocused(e) {
  //   // do something when input is focused
  // }
  // onChangeSearch(key: string) {
  //   this.ngxLoader.start();
  //   this.tags = []
  //   this.apiservice.searchTag(key).subscribe((res: any) => {
  //     this.tags = res;
  //     console.log('tags', this.tags)
  //     this.ngxLoader.stop()
  //   });
  // }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      console.log('catogsdsadasa', this.categories)
    });
  }

  getProviderProgram = async () => {
    var id = ''
    if (this.program.user) {
      id = this.program.user
    } else {
      id = this.user.id
    }
    await this.apiservice.getProgramByProvider(id, this.pageNo, this.pageSize).subscribe((res) => {
      this.isScrol = true;
      console.log('provider program', this.programs);
      this.programs = res
    });

  }

  ngOnInit() {
    this.getProfileProgress()
    this.getBadges();
    window.scroll(0, 0)
    this.getProviderById();
    this.userUpdateForm = new FormGroup({
      firstName: new FormControl('', []),
      about: new FormControl('', []),
      country: new FormControl('', []),
      addressLine1: new FormControl('', []),
      addressLine2: new FormControl('', []),
      email: new FormControl('', []),
      phoneNumber: new FormControl('', []),
      website: new FormControl('', []),
      facebook: new FormControl('', []),
      twitter: new FormControl('', []),
      instagram: new FormControl('', []),
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('program');
  }

  getBadges() {
    this.apiservice.badgeList().subscribe(res => {
      this.badges = res;
      this.badgesList = this.badges.data;
      this.badgesList
      console.log('badges here', this.badgesList)
    });
  }

// ----------------------------------------add action-------------------------------------------
  addAction(programId) {
    let body = {
      action: 'click',
      programId: programId
    };
    this.apiservice.addAction(body).subscribe((res: any) => {
    });
  }

// ---------------------------------navigate to program detail page -------------------------------------------
  goToProgramDetail(data) {
    console.log('clicked program', data)
    if (this.parentRole) {
      this.addAction(data._id);
    }
    this.router.navigate(['program/detail', data._id]);
  }

  viewChange(){
    if(this.isGrid===true){
      this.isList=true;
      this.isGrid=false;
    }else if(this.isList===true){
      this.isList=false;
      this.isGrid=true;
    }
  }

  addProgram() {
    console.log('userrrrr',this.user)
    if (this.userData.phoneNumber == '' || this.userData.addressLine1 == '' || this.userData.avatarImages == '') {
      // this.toastyService.warning("you need to complete  your profile before adding new program!");
    }
    else { this.router.navigate(['/program/add']); }
  }



}

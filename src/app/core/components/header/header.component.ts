import { Component, OnInit} from '@angular/core';
import {Router,} from '@angular/router';
import { User } from '../../models';
import { AuthsService } from '../../services/auths.service';
import { ApiService } from '../../services/api.service.service';
import { UserDataService } from '../../services/user-data.service';
import { Globals } from '../../common/imageLoader';
import { LocalStorageService } from '../../services';
import { DataService } from '../../services/dataservice.service ';
import { ToastrService } from 'ngx-toastr';

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  user = new User;
  routeName: string;
  isToggle: boolean;
  profileClass: string = "active"
  programClass: string = ""
  settingClass: string = ""
  insightClass: string = ""
  helpClass: string = ""
  forumClass: string = ""
  chatClass: string = ""
  filterData: any = {
    subcatId: '',
    activityName: '',
  }

  initialUrl: any;
  feedbackData: any = {
    id : '',
    feedback: ''
  }
  logoPosition=false;
  searchBar=false
  notification: any;
  profileProgressResponse: any;
  progressBarValue: any;
  profileProgress: string = ''
  message: string = 'Please Login First!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  categoriesBySearch: any;
  providersBySearch: any;
  constructor(
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private userdataservice: UserDataService,
    public imageLoader: Globals,
    private toastr: ToastrService,
    private dataservice: DataService,
    public store : LocalStorageService
  ) {
    this.user = this.auth.currentUser();
    this.auth.userChanges.subscribe(user => this.user = user)
    this.routeName = this.router.url;
    if (this.routeName === '/search') {
      this.logoPosition=true;
    }
    if(this.routeName === '/search'|| this.routeName === '/'){ this.searchBar=true}
    if (this.user.role === "provider" || this.user.role === "parent") {
      if (this.user.role === "provider") {
        this.isLogin = true;
      }
      else if (this.user.role === "parent") {
        this.isLogin = false;
      }
    } else { auth.logout(); }
    this.getProfileProgress()
  }
  logo() {
    if(this.logoPosition){
          this.router.navigate(['']);
  }else{
    this.router.navigate(['/search']);
  }
  }
  addProgram() {
    this.router.navigate(['/provider/program/add']);
  }
  profile() {
    if (this.user.role === "parent") {
      this.router.navigate(['parent/profile', this.user.id]);
    }
    else if (this.user.role === "provider") {
      this.router.navigate(['provider/profile', this.user.id]);
    }
    else {
      this.router.navigate(['login']);
    }

  }
  savedList() {
    if (this.user.role === "parent") {
      this.store.setItem('savedList', '1')
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['parent/profile', this.user.id]))
    }
  }
  getProfileProgress() {
    this.apiservice.getProfileProgress(this.user.id, this.user.role).subscribe((res: any) => {
      this.profileProgress = res.profileProgress.toString()
      $("#progress").attr("data-percentage", this.profileProgress);
    });
  }
  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      this.user = res.data;
      if (this.user.notificationsOnOff === true) {
        this.isToggle = true;
      }
      // this.auth.setUser(this.user);
    });
  }
  clearAll() {
    this.apiservice.clearAllNotifications(this.user.id).subscribe((res: any) => {
      this.notification = res;
      this.getUserById()
      // $("#progress").attr("data-percentage", this.profileProgress);
    });
  }
  deleteNotification(data, indx) {
    this.apiservice.deleteNotification(data).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getUserById()
      }
    });
  }
  onOffNotification(id, e) {
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      this.getUserById()
    });
  }


  ngOnInit() {
    this.getUserById()

    if (this.routeName === '/profile', this.user.id) {
      this.profileClass = 'active';
    }
    if (this.routeName === '/program/list') {
      this.programClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/detail') {
      this.programClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/add') {
      this.programClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === 'help') {
      this.helpClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/home') {
      this.insightClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/setting') {
      this.settingClass = 'active'
      this.profileClass = '';

    }
    if (this.routeName === '/forum/forum-type') {
      this.forumClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/chat') {
      this.chatClass = 'active'
      this.profileClass = '';
    }
  }


ngOnDestroy() {
  window.document.getElementById("close_feedback_modal").click();
}
 logout() {
  window.document.getElementById("open_feedback_modal").click();
  }
submitFeedback(){
  this.feedbackData.id = this.user.id
  this.apiservice.sendFeedback(this.feedbackData).subscribe((res: any) => {
   if(res.isSuccess=== true){
    this.toastr.info('Thank you!', ':)');
     this.auth.logout();
     this.userdataservice.logout();
     localStorage.clear();
     this.router.navigate(['login']);
   }
 });
}

cancelFeedback(){
    this.auth.logout();
    this.userdataservice.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
}

searchSubCategory(key){
  this.apiservice.searchTag(key).subscribe((res:any)=>{
this.categoriesBySearch = res;
  })
}

providerSearch(key){
  this.apiservice.searchUsers(key,'provider').subscribe((res:any)=>{
    this.providersBySearch = res.data;
  })
}

searchBySubCategory(id) {
  this.filterData.activityName=''
  this.filterData.subcatId = id
  this.dataservice.setOption(this.filterData)
  this.router.navigate(['/search']);
}

goToProviderProfile(provider) {
  this.filterData.activityName=''
  provider.firstName = provider.firstName.toLowerCase();
  provider.firstName = provider.firstName.replace(/ /g,"-");
  provider.firstName = provider.firstName.replace(/\?/g,"-");
    this.router.navigate(['/program-provider', provider.firstName, provider._id]);
}

searchActivityByNameDate() {
  this.dataservice.setOption(this.filterData)
  this.router.navigate(['/search']);
}

}

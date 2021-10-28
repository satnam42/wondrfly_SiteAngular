import { Component, OnInit, ViewChild, AfterViewChecked,OnDestroy, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/core/services/api.service.service";
import { Router } from "@angular/router";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CustomValidators } from "ng2-validation";
import { Child } from "../../../core/models/child.model";
import { User } from "../../../core/models/user.model";
import { HeaderComponent } from "src/app/core/components/header/header.component";
import * as moment from "moment";
import { AuthsService } from "src/app/core/services/auths.service";
import { ChatService, Chat } from "src/app/core/services/chat.service";
import { LocalStorageService } from "src/app/core/services";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { ToastrService } from "ngx-toastr";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "parent-profile",
  templateUrl: "./parent-profile.component.html",
  styleUrls: ["./parent-profile.component.css"],
})
export class ParentProfileComponent implements OnInit, AfterViewChecked,OnDestroy {
  @ViewChild('messageBox', { static: false }) myScrollContainer: ElementRef;
  updateForm: FormGroup;
  resetPasswordForm: FormGroup;
  addChildForm: FormGroup;
  editChildForm: FormGroup;
  addGuardianForm: FormGroup;
  tellFriendForm: FormGroup;
  giveFeedbackForm: FormGroup;
  kid = new Child();
  resetKid = new Child();
  user = new User();
  isToggle:boolean;
  guardianData = new User();
  kids:Child[];
  isSideBar: Boolean = true;
  msg: string;
  guardianResponse: any = [];
  favourites: any = [];
  invitedUsers:User[] = []
  profileProgress: 0;
  fileData: File = null;
  parentImgURL: any;
  childImgURL: any;
  updateChildImgURL: any;
  isProfile = false;
  profile = "";
  isChat = false;
  chat = "";
  isSetting = false;
  setting = "";
  isGuardian = false;
  guardian = "";
  isInvite = false;
  isChildren = false;
  children = "";
  isAddChild = false;
  isEditChildBtn = false;
  isAddChildBtn = false;
  isFavourite = false;
  favourite = "";
  isNotification = false;
  parentRole: boolean = false;
  notification = "";
  isFriend = false;
  friend = "";
  isFeedback = false;
  feedback = "";
  users: any = new User();
  public activeContact: any = new User();
  currentUser: any = new User();
  isLoading: boolean;
  chatCollection: any[] = [];
  text: string;
  date = new Date();
  selectedIndex: number = null;
  typingMsg: string;
  pageNo: number = 1;
  pageSize: number = 40;
  currentRoom: any = {};
  roomId: string;
  chats: any = [];
  usersRole: any;
  isScrol: boolean = true;
  loaderPostion = "center-center";
  loaderType = "ball-spin-clockwise";

  // ---------------autucomplete-------------
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  addGuardianData: any = {
    firstName: "",
    email: "",
    personalNote: "",
    parentId: "",
  };
  inviteForm: FormGroup;
  inviteAsktojoin: any = {
    firstName:'',
    userId: this.user.id,
    email: "",
  };

  categoryIds: [] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(HeaderComponent, { static: true })
  headerComponent: HeaderComponent;
  message: string = "Updated Successfully";
  addMessage: string = "Child Added Successfully";
  action: boolean = true;
  editChild: any;
  keyword = "name";
  SelectedCategories: any = [];
  childImageURl: "";
  resetPasswordData: any = {
    oldPassword: "",
    newPassword: "",
  };
  tellFriendData: any = {
    parentName: "",
    fullName: "",
    email: "",
    personalNote: "",
  };
  giveFeedbackData: any = {
    id: "",
    name: "",
    email: "",
    feedback: "",
  };
  // ------------------------------------
  tags: any = [];
  savedList = '';
  sendInvite = '';
  isSMSnotification:boolean;
  isPushnotification:boolean;
  isEmailnotification:boolean;
  selectedProgram: any;
  isParent: boolean;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private authService: AuthsService,
    private chatService: ChatService,
    public store: LocalStorageService,
    private snack: MatSnackBar,
    private toastr: ToastrService,
  ) {
    this.currentUser = this.authService.currentUser();
    this.sendInvite = JSON.parse(this.store.getItem('sendInvite'));
    this.savedList = JSON.parse(this.store.getItem('savedList'));

  }


  parentChecked(value:boolean) {
    this.isParent=value
  }


  getKidData(data) {
    this.kid = data;
    console.log(this.kid)
    this.childImgURL = this.kid.avtar;
  }
  getGuardianData(data) {
    console.log('guardian data', data)
    this.guardianData = data;
  }
  sideBar() {
    this.isSideBar = !this.isSideBar;
  }
  back() {
    this.router.navigate(["/search"]);
  }
  refreshPage() {
    this.ngxLoader.start();
    this.kid = new Child();
    this.kid.interestInfo = [];
    this.tags = [];
    this.ngxLoader.stop();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.kid.interestInfo.push(event.option.value);
  }
  remove(t: string): void {
    const index = this.kid.interestInfo.indexOf(t);

    if (index >= 0) {
      this.kid.interestInfo.splice(index, 1);
    }
  }

  selectEvent(item) {
    this.kid.interestInfo.push(item);
  }
  onChangeSearch(key: string) {

    this.isLoading = true;
    this.ngxLoader.start();
    this.tags = [];
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      this.ngxLoader.stop();
      this.isLoading = false;
    });

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  onProfile() {
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
    window.scroll(0, 0);
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
    this.getParentById();
    this.isFavourite = false;
    this.favourite = "";
    this.isProfile = true;
    this.profile = "active";
  }
  onChat() {
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
    window.scroll(0, 0);
    this.isChat = true;
    this.chat = "active";
    this.isProfile = false;
    this.profile = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
    // return this.getParentById();
    return this.getUsers();
  }

  onGuardian(id) {
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
    window.scroll(0, 0);
    this.ngxLoader.start();
    this.apiservice.getGuardianByParentId(id).subscribe((res: any) => {
      if (res.length) {
        this.guardianResponse = res;
        console.log('guardian list ', res)
        this.ngxLoader.stop();
      }

    });
    this.ngxLoader.stop();
    this.isProfile = false;
    this.profile = "";
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = true;
    this.guardian = "active";
    this.isChildren = false;
    this.children = "";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
  }

  // ------------------guardian invite-----------------
  onGuardianAdd() {
    window.scroll(0, 0);
    this.isGuardian = false;
    this.isInvite = true;
  }
  // --------------------------------------------------

  onChildren(id) {
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
    window.scroll(0, 0);
    this.isProfile = false;
    this.profile = "";
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = true;
    this.children = "active";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;

    this.ngxLoader.start();
    this.apiservice.getChildByParentId(id).subscribe((res: any) => {
      this.kids = res
      this.kids = this.kids.filter((item) => item.isActivated !== false);
      console.log('children List', res)
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }
  onAddChild() {
    window.scroll(0, 0);
    this.isAddChildBtn = true;
    this.isChildren = false;
    this.isAddChild = true;
    this.isEditChildBtn = false;
    this.kid = new Child();
    this.isProfile = false;
    this.profile = "";
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "active";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isEditChildBtn = false;
  }

  onEditChild(child) {
    window.scroll(0, 0);
    this.kid = child;
    this.isChildren = false;
    this.isAddChild = true;
    this.isAddChildBtn = false;
    this.isEditChildBtn = true;
  }
  onInvite(userId) {
    this.store.removeItem('savedList');
    window.scroll(0, 0);
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
    this.isFavourite = false;
    this.favourite = "";
    this.isProfile = false;
    this.profile = "";
    this.isInvite = true;


  }
  getFav(id) {
      this.apiservice.getFavouriteByParentId(id).subscribe((res) => {
        this.favourites = res;
        console.log('saved list ',this.favourites)
      });
      this.isFavourite = true;
      this.favourite = "active";
      this.isProfile = false;
      this.profile = "";

    this.isSetting = false;
    this.setting = "";
    this.isChat = false;
    this.chat = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
  }

  onNotification() {
    this.store.removeItem('savedList');
    window.scroll(0, 0);
    this.isProfile = false;
    this.profile = "";
    this.isChat = false;
    this.chat = "";
    this.isSetting = false;
    this.setting = "";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = true;
    this.notification = "active";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
  }

  activeDactiveChild(kidId, value, parentId) {
    this.ngxLoader.start();
    this.apiservice.activeDactiveChild(kidId, value).subscribe((res: any) => {
      console.log('res', res)
      let msg = ''
      this.ngxLoader.stop();
      if (res.isSuccess) {
        if (res.data.isActivated) {
          msg = 'Child Activated'
        }
        else {
          msg = 'Child Deactivated'
        }
        // this.toastr.info(msg );
        this.onChildren(parentId);
      } else {
        this.toastr.error(res.error);
      }
    });
  }
  // deleteGuardian(guardianId) {
  //   this.ngxLoader.start();
  //   this.apiservice.deleteGuardian(guardianId).subscribe((res: any) => {
  //     console.log('delete', res)
  //     this.ngxLoader.stop();
  //     if (res.isSuccess) {
  //       this.toastr.info( "Info","Guardian deleted!");
  //     }
  //     this.onGuardian(this.currentUser.id)
  //   });
  // }
  activedeactiveGuardian(id, value) {
    this.ngxLoader.start();
    this.apiservice.activedeactiveGuardian(id, value).subscribe((res: any) => {
      console.log('res', res)
      this.ngxLoader.stop();
      let msg='';
      if (res.isSuccess) {
        if (res.data.isActivated) {
          msg = 'Guardian Activated'
        }
        else {
          msg = 'Guardian Deactivated'
        }
        // this.toastr.info(msg);
      }
      else {
        this.toastr.error(res.error);
      }
      this.onGuardian(this.currentUser.id)
    });
  }
  activeDeactiveUser(id, isActivated) {
    this.ngxLoader.start();
    this.apiservice.activeDeactiveUser(id, !isActivated).subscribe((res) => {
      this.ngxLoader.stop();
      if (res && res.isActivated === false) {
        this.toastr.info("Acount Deactivated!");
      this.getParentById();
      } else {
        if (res && res.isActivated === true) {
          this.toastr.info("Acount Activated!");
        this.getParentById();
        } else {
          this.toastr.error("Somthing went wrong!");
        }
      }
    });
    this.ngxLoader.stop();
  }
  onOffNotification(id, e) {
    console.log('status before', e)
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      console.log('notific onoff res', res)
      this.headerComponent.getUserById()
    });
    this.isSMSnotification = e;
  this.isPushnotification = e;
  this.isEmailnotification= e;
  }
  onSetting() {
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
    window.scroll(0, 0);
    this.isProfile = false;
    this.profile = "";
    this.isChat = false;
    this.chat = "";
    this.isSetting = true;
    this.setting = "active";
    this.isGuardian = false;
    this.guardian = "";
    this.isChildren = false;
    this.children = "";
    this.isFavourite = false;
    this.favourite = "";
    this.isNotification = false;
    this.notification = "";
    this.isFriend = false;
    this.friend = "";
    this.isFeedback = false;
    this.feedback = "";
    this.isInvite = false;
    this.isAddChild = false;
    this.isEditChildBtn = false;
  }
  // remove(indx): void {
  //   this.kid.interestInfo.splice(indx, 1);
  // }
  parentImageSelect(event, id) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    this.ngxLoader.start();
    this.apiservice.uploadUserImage(id, formData).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('res from server ',res);
      if (res) {
        this.getParentById();
        this.getProfileProgress();
        this.headerComponent.getProfileProgress();
        this.headerComponent.getUserById();
      } else {
        this.toastr.error("something went wrong, please try again Later!");
      }
    });
    this.ngxLoader.stop();
  }
  childImageSelect(event) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    // --------------------preview image before upload ------------------------
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.childImgURL = reader.result;
    };
    // -------------------------------------------------------------------------------
    this.apiservice.getPicUrl(formData).subscribe((res) => {
      this.kid.avtar = res;
      console.log('img string res',this.kid.avtar)
    });
  }
  childImageUpdate(event, indx) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    // --------------------preview image before upload ------------------------
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.childImgURL = reader.result;
    };
    // -------------------------------------------------------------------------------
    this.apiservice.getPicUrl(formData).subscribe((res) => {
      this.kids[indx].avtar = res;
      this.updateChild(this.kids[indx], this.currentUser.id)
    });
  }
  updateParent(parent) {
    this.user.avatarImages;
    this.ngxLoader.start();
    this.apiservice.updateParent(parent.id, parent).subscribe((res: any) => {
      this.getProfileProgress();
      this.headerComponent.getProfileProgress();
      this.headerComponent.getUserById();
      this.ngxLoader.stop();
      if (res) {
        // this.toastr.info(this.message);
      } else {
        if (this.currentUser === null || this.currentUser === undefined) {
          this.router.navigate(["/login"]);
          let msg = "Please Login First!";
          // this.toastr.info(msg);
        } else {
          let msg = "Something Went Wrong!";
          // this.toastr.info(msg);
        }
      }
    });
  }
  resetPassword(id) {
    this.ngxLoader.start();
    this.apiservice
      .resetPassword(id, this.resetPasswordData)
      .subscribe((res: any) => {
        this.ngxLoader.stop();
        if (res) {
          // this.toastr.info(res.message);
          this.authService.logout()
          this.router.navigate(["/login"]);
        } else {
          if (this.currentUser === null || this.currentUser === undefined) {
            this.router.navigate(["/login"]);
            let msg = "Please Login First!";
            // this.toastr.info(msg);
          } else {
            if (res.error === "Old Password Not Match") {
              this.toastr.error(res.error );
            } else {
              let msg = "Something Went Wrong!";
              // this.toastr.info(msg);
            }
          }
        }
      });
  }

  inviteGuardian(id) {
    this.addGuardianData.parentId = id;
    this.ngxLoader.start();
    this.apiservice.inviteGuardian(this.addGuardianData).subscribe((res: any) => {
      if (res.isSuccess) {
        this.ngxLoader.stop();
        // this.onGuardian(id);
        // this.toastr.info(res.message.message);
      } else {
        this.ngxLoader.stop();
        this.toastr.error(res.error);
      }
      this.ngxLoader.stop();
    });
  }

  updateGuardian(data, id) {
    data.parentId = id;
    this.ngxLoader.start();
    this.apiservice.updateGuardian(data).subscribe((res: any) => {
      this.ngxLoader.stop();

      if (res) {
        // this.toastr.info("Guardian Updated!");
      } else {
        this.toastr.error(res.error);
      }
    });
    this.ngxLoader.stop();
  }

  addChild(userId) {
    let childResponse;
    this.kid.parentId = userId;
    if (this.childImageURl != "" && this.childImageURl != undefined) {
      this.kid.avtar = this.childImageURl;
    }
    if (this.kid.name === "") {
      this.toastr.error(childResponse.error);
    } else {
      this.ngxLoader.start();
      var birth = new Date(this.kid.dob);
      let birthYear = moment(birth).format("YYYY");
      let currentYear = moment(Date.now()).format("YYYY");
      if (birthYear >= currentYear) {
        this.ngxLoader.stop();
        this.toastr.warning("please fill valid birth year");
      } else {
        var ageDifMs = Date.now() - birth.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age > 20) {
          this.toastr.warning("please fill valid birth year")
          this.ngxLoader.stop();
        } else {
          this.kid.age = String(age);
          this.apiservice.addChild(this.kid).subscribe((res) => {
            childResponse = res;
            this.getProfileProgress();
            this.headerComponent.getProfileProgress();
            this.headerComponent.getUserById();
            this.ngxLoader.stop();

            if (childResponse) {
              this.ngxLoader.start();
              this.apiservice
                .getGuardianByParentId(userId)
                .subscribe((res: any) => {
                  this.guardianResponse = res;
                  this.onChildren(userId);
                  this.ngxLoader.stop();
                });
              this.ngxLoader.stop();
              // this.toastr.info(this.addMessage);
            }
          });
        }
      }
    }
  }
  updateKidInterest(kidIndx, interestIndx) {
    this.kids[kidIndx].interestInfo.splice(interestIndx, 1);
    this.updateChild(this.kids[kidIndx], this.currentUser.id)
  }
  updateChild(child, userId) {
    var birth = new Date(child.dob);
    let birthYear = moment(birth).format("YYYY");
    let currentYear = moment(Date.now()).format("YYYY");
    if (birthYear > currentYear) {
      this.toastr.warning("please fill valid birth year",);
    } else {
      if (this.childImageURl != "" && this.childImageURl != undefined) {
        this.kid.avtar = this.childImageURl;
      }
      var ageDifMs = Date.now() - birth.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      var age = Math.abs(ageDate.getUTCFullYear() - 1970);
      child.age = String(age);
      child.avtar = child.avtar.split('https://wondrfly.com/').pop();
      // child.avtar =  child.avtar.slice(21);
      console.log('data image', child);
      this.apiservice.updateChild(child.id, child).subscribe((res: any) => {
        console.log('data image', res);
        this.getProfileProgress();
        this.headerComponent.getProfileProgress();
        this.headerComponent.getUserById();
        if (res) {
          // this.onChildren(parentId);
          let msg = "Child Updated Successfully!";
          // this.toastr.info(msg );
        } else {
          if (this.currentUser === null || this.currentUser === undefined) {
            this.router.navigate(["/login"]);
            let msg = "Please Login First!";
            // this.toastr.info(msg);
          } else {
            let msg = "Something Went Wrong!";
            this.toastr.error(msg);
          }
        }
      });
    }
    this.onChildren(this.currentUser.id);
  }
  getParentById() {
    this.apiservice.getParentById(this.currentUser.id).subscribe((res) => {
      this.user = res;

    });
  }
  getUserById() {
    this.apiservice.getUserById(this.currentUser.id).subscribe((res: any) => {
      this.user = res.data;
      if (this.user.notificationsOnOff === true) {
        this.isToggle = true;
        this.isSMSnotification = true;
        this.isPushnotification = true;
        this.isEmailnotification= true;
      }
    });
  }
  getProfileProgress() {
    this.apiservice
      .getProfileProgress(this.currentUser.id, this.currentUser.role)
      .subscribe((res: any) => {
        this.profileProgress = res.profileProgress;
      });
  }
  removeFav(favId) {
    this.apiservice.deleteFavProgram(favId).subscribe((res: any) => {
      this.getFav(this.currentUser.id);
    });
  }
  onScroll() {
    if (this.isScrol) {
      this.isScrol = false;
      this.loaderType = "three-bounce";
      this.loaderPostion = "bottom-center";
      this.pageSize += 40;
      this.getUsers();
    }
  }
  getUsers() {
    this.isScrol = true;
    this.apiservice
      .getUsers(this.usersRole = "all", this.pageNo, this.pageSize)
      .subscribe((res: any) => {
        this.users = res.items;
      });
  }
  searchUsers(key) {
    if (key) {
      this.apiservice
        .searchUsers(key, this.usersRole = "all")
        .subscribe((res: any) => {
          this.users = res.data;
        });
    }
    else { return this.getUsers() }
  }
  getOldChat() {
    this.isLoading = true;
    this.apiservice
      .getOldChat(this.roomId, this.pageNo, this.pageSize)
      .subscribe((res: any[]) => {
        this.chatCollection = res;
        console.log("old chat", res);
      });
    this.scrollToBottom();
  }
  trackByFn(index, item) {
    this.selectedIndex = index;
    return index;
  }
  slectedUser(user) {
    if (this.activeContact !== user) {
      this.chatCollection = [];
      this.text = "";
    }
    this.activeContact = user;
    let currentRoom = this.currentUser.firstName + "-" + this.activeContact.firstName;
    let reverseRoom = this.activeContact.firstName + "-" + this.currentUser.firstName;
    this.chatService.setUser(this.currentUser.firstName);
    this.chatService.createRomm(currentRoom, reverseRoom);
    this.getRoomId();
  }
  ngOnInit() {
    if(this.savedList){
      this.store.removeItem('sendInvite');
      this.getFav(this.currentUser.id);
    }
    else if(this.sendInvite){
      this.onInvite(this.currentUser.id)
    }
    else{
        this.getParentById();
        this.isFavourite = false;
        this.favourite = "";
        this.isProfile = true;
        this.profile = "active";
    }
    this.betaProgramInvitedUsers(this.currentUser.id);
    window.scroll(0, 0);
    this.getProfileProgress();
    this.headerComponent.getProfileProgress();
    this.headerComponent.getUserById();
    this.getUserById();
    this.getParentById();
    this.user.avatarImages = this.currentUser.avatarImages;
    this.chatService.getMessages().subscribe((message: Chat) => {
      if (message.msgFrom !== this.currentUser.firstName) {
        this.chatCollection.push(message);
      }
    });
    this.chatService.getMedia().subscribe((message: Chat) => {
      if (message.msgFrom !== this.currentUser.firstName) {
        this.chatCollection.push(message);
      }
    });
    this.chatService.getTyping().subscribe((msg: string) => {
      console.log("typing", this.typingMsg);
      let setTime;
      clearTimeout(setTime);
      //showing typing message.
      this.typingMsg = msg;
      //showing typing message only for few seconds.
      setTime = setTimeout(() => {
        this.typingMsg = "";
      }, 3500);
    });
    this.updateForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email]),
      addressLine1: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
    });
    let newPassword = new FormControl("", [Validators.required]);
    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(newPassword),
    ]);
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    this.addGuardianForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      // personalNote: new FormControl("", [Validators.required]),
    });

    this.inviteForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });

    this.giveFeedbackForm = new FormGroup({
      name: new FormControl("", []),
      email: new FormControl("", []),
      feedback: new FormControl("", [Validators.required]),
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  ngOnDestroy(): void{
    this.store.removeItem('savedList');
    this.store.removeItem('sendInvite');
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
  getRoomId() {
    console.log('service func.. calling ')
    this.chatService.getRoomId().subscribe((id: string) => {
      console.log('response room id ')
      this.roomId = id;
      console.log('roomId', this.roomId)
      this.getOldChat();
    });
  }
  startTyping() {
    this.chatService.startTyping();
  }
  sendMedia(event) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    console.log("formData", formData);
    this.apiservice.getPicUrl(formData).subscribe((imgURL: any) => {
      console.log("image from server ", imgURL);

      if (imgURL) {
        let data = {
          msgFrom: this.currentUser.firstName,
          msgTo: this.activeContact.firstName,
          image: imgURL,
          room: this.roomId,
          date: new Date(),
        };
        console.log("image from server ", data);
        console.log("media data", data);
        this.chatService.sendMedia(data);
        this.getOldChat();
      }
    });
  }
  sendMessage() {
    if (this.text.trim() == "") return;
    let data = {
      msgFrom: this.currentUser.firstName,
      msg: this.text,
      msgTo: this.activeContact.firstName,
      date: new Date(),
    };
    this.chatCollection.push(data);
    this.chatService.sendMessage(data);

    this.text = "";
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
    data.name = data.name.replace(/ /g,"-");
    data.name = data.name.replace(/\?/g,"-");
    this.router.navigate(['program', data.name, data._id]);
  }

copyInvite(){
  navigator.clipboard.writeText(`https://www.wondrfly.com/ask-to-join/${this.user.id}`).then().catch(e => console.error(e));
         this.snack.open('Link copied','', { duration: 500 });
}

inviteAsktojoina(){
  this.inviteAsktojoin.userId = this.user.id
  console.log(this.inviteAsktojoin)
  this.apiservice.InviteAsktojoin(this.inviteAsktojoin).subscribe((res:any) => {
    console.log(res)
    if(res.isSuccess===true){
      this.betaProgramInvitedUsers(this.currentUser.id)
    }
    else{
      this.toastr.error(res.error);
    }
  })
}
betaProgramInvitedUsers(userId){
  this.apiservice
  .getInvitedUsersByParent(userId)
  .subscribe((res: any) => {
    this.invitedUsers = res;
    console.log('invited users',this.invitedUsers)
  });
}
}

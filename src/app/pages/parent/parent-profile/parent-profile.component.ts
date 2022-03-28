import { Component, OnInit, ViewChild, AfterViewChecked, OnDestroy, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/core/services/api.service.service";
import { Router } from "@angular/router";
import { COMMA, ENTER, I } from "@angular/cdk/keycodes";
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
import { environment } from "src/environments/environment";

@Component({
  selector: "parent-profile",
  templateUrl: "./parent-profile.component.html",
  styleUrls: ["./parent-profile.component.css"],
})
export class ParentProfileComponent implements OnInit, AfterViewChecked, OnDestroy {
  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';
  baseUrl = environment.baseUrl;
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
  isToggle: boolean;
  guardianData = new User();
  kids: Child[];
  isSideBar: Boolean = true;
  msg: string;
  guardianResponse: any = [];
  favourites: any = [];
  invitedUsers: User[] = []
  profileProgress: 0;
  fileData: File = null;
  formData = new FormData();
  childformData = new FormData();
  imagePath;
  parentImgURL: any;
  childImgURL: any;
  updateChildImgURL: any;
  userValueChanged = false;
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
  selectable: boolean = false;
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
    firstName: '',
    userId: this.user.id,
    email: "",
  };

  categoryIds: [] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  searchedTags:any = [
    {
      category: 'test1',
      subcategories: [{ name: 'sub1' }, { name: 'sub2' }, { name: 'sub3' }]
    },
    {
      category: 'test2',
      subcategories: []
    },
    {
      category: 'test3',
      subcategories: [{ name: 'subA' }, { name: 'subB' }]
    },
  ]
  subCategoryCheckbox:any=[]
  categoryChecked:any=[]
    @ViewChild(HeaderComponent, { static: true })
  headerComponent: HeaderComponent;
  message: string = "Updated Successfully";
  addMessage: string = "Child Added Successfully";
  action: boolean = true;
  editChild: any;
  keyword = "name";
  // keyword = ''
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
  allTags: any = [];
  suggestedTags: any = [];
  sendInvite = '';
  isSMSnotification: boolean;
  isPushnotification: boolean;
  isEmailnotification: boolean;
  selectedProgram: any;
  isParent: boolean;
  imageRole = '';
  selectedChildIndx: number
  maxDate: string;
  activeList: any
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
    this.activeList = this.store.getItem('activeList');
    this.currentUser = this.authService.currentUser();
    this.sendInvite = JSON.parse(this.store.getItem('sendInvite'));
  }

  dateV() {
    let today = new Date()
    this.maxDate = moment(today).format("YYYY-MM-DD");
    document.getElementById("listingDateOpen").setAttribute("max", this.maxDate);
  }

  parentChecked(value: boolean) {
    this.isParent = value
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
    if (this.kid.interestInfo.indexOf(item) == -1) {
      if (!this.kid.interestInfo.find(category => category.name === item.name)) {
        this.kid.interestInfo.push(item)
        console.log('===>>', this.kid.interestInfo)
      }
    }
  }
  onChangeSearch(key: string) {
    console.log('keykeykey', key)
    this.isLoading = true;
    this.ngxLoader.start();
    this.tags = [];
    this.apiservice.searchTag(key).subscribe((res: any) => {
      this.tags = res;
      this.tags.tags = this.tags.tags.filter((item) => item.isActivated === true);
      console.log(this.tags.tags)
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
    this.store.removeItem('sendInvite');
    this.store.removeItem('activeList');
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
    this.store.removeItem('sendInvite');
    this.store.removeItem('activeList');
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
    this.store.removeItem('activeList');
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
    this.activeList = 'kidList'
    this.store.removeItem('activeList');
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
      this.kids = this.kids.filter((item) => item.isActivated === true);
      let kids = []
      this.kids.forEach(kid => {
        let kidMonth = Math.abs((this.getAgeMonth(kid.dob)))
        console.log('kidMonth>>>>>', kidMonth)
        let age = Number(this.getAge(kid.dob))
        console.log('age>>>>>', age)
        if (age < 1) {
          if (kidMonth > 1) {
            kid.age = kidMonth + ' Months Old'
          }
          else {
            kid.age = kidMonth + ' Month Old'
          }
        }

        if (age == 1) {
          kid.age = age + ' Year Old'

        }
        if (age > 1) {
          kid.age = age + ' Years Old'

        }


        kids.push(kid)
      });
      this.kids = kids
      console.log('children List', res)
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }

  getAgeMonth(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    // var age = today.getFullYear() - birthDate.getFullYear();
    // var m = today.getMonth() - birthDate.getMonth();
    // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    // {
    //     age--;
    // }

    // return m;

    var months;
    months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    return months;

  }
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
    this.store.removeItem('activeList');
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
    this.activeList = 'savedList'
    this.store.removeItem('activeList');
    this.store.removeItem('sendInvite');
    this.apiservice.getFavouriteByParentId(id).subscribe((res) => {
      this.favourites = res;
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
    this.store.removeItem('activeList');
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
      let msg = '';
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
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      this.headerComponent.getUserById()
    });
    this.isSMSnotification = e;
    this.isPushnotification = e;
    this.isEmailnotification = e;
  }
  onSetting() {
    this.store.removeItem('sendInvite');
    this.store.removeItem('activeList');
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
  previewImage(event) {
    // --------------------preview image before upload ------------------------
    this.fileData = File = null;
    this.formData = new FormData();

    this.fileData = event.target.files[0];
    this.formData.append("image", this.fileData);
    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.parentImgURL = reader.result;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = " only images are supported";
      return;
    }
  }
  previewChildImage(event) {
    // --------------------preview image before upload ------------------------
    let fileData = File = null
    fileData = event.target.files[0];
    this.childformData.append("image", fileData);
    // --------------------preview image before upload ------------------------
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.childImgURL = reader.result;
      console.log('res from  this.childImgURL ', this.childImgURL);
    };
  }

  uploadParentImg() {
    this.ngxLoader.start();
    this.apiservice.uploadUserImage(this.currentUser.id, this.formData).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('res from server ', res);
      if (res) {
        this.getParentById();
        this.getProfileProgress();
        this.headerComponent.getProfileProgress();
        this.headerComponent.getUserById();
        window.document.getElementById("closeId").click();
        this.parentImgURL = '';
      } else {
        this.toastr.error("something went wrong, please try again Later!");
      }
      this.ngxLoader.stop();
    });
  }

  uploadChildImg() {
    this.apiservice.getPicUrl(this.childformData).subscribe((res) => {
      this.kids[this.selectedChildIndx].avtar = res;
      console.log('img string res', res)
      this.childformData = new FormData();

      this.updateChild(this.kids[this.selectedChildIndx], this.currentUser.id)
      window.document.getElementById("closeId").click();
    });
  }
  removeParentImage() {
    this.apiservice.removeUserImage(this.currentUser.id).subscribe((res: any) => {
      console.log('res from server ', res);
      if (res.isSuccess) {
        this.getParentById();
        this.getProfileProgress();
        this.headerComponent.getProfileProgress();
        this.headerComponent.getUserById();
        window.document.getElementById("closeId").click();
      } else {
        this.toastr.error("something went wrong, please try again Later!");
      }
    });
  }
  removeChildImage() {
    {
      this.apiservice.removeChildImage(this.kids[this.selectedChildIndx].id).subscribe((res: any) => {
        console.log('res from server ', res);
        if (res.isSuccess) {
          this.onChildren(this.currentUser.id)
          window.document.getElementById("closeId").click();
        } else {
          this.toastr.error("something went wrong, please try again Later!");
        }
      });
    }
  }

  childImageSelect(event) {
    let formData = new FormData();
    let fileData = event.target.files[0];
    formData.append("image", fileData);
    // --------------------preview image before upload ------------------------
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.childImgURL = reader.result;
      console.log('res from  this.childImgURL ', this.childImgURL);
    };
    // -------------------------------------------------------------------------------
    this.apiservice.getPicUrl(formData).subscribe((res) => {
      this.kid.avtar = res;
      console.log('img string res', this.kid.avtar)
    });
  }
  childImageUpdate(event, indx) {
    let formData = new FormData();
    this.fileData = event.target.files[0];
    formData.append("image", this.fileData);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.childImgURL = reader.result;
      console.log('this.childImgURL', this.childImgURL);
    };
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
      this.userValueChanged = false
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
    this.userValueChanged = false
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
              this.toastr.error(res.error);
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
      if (birthYear > currentYear) {
        this.ngxLoader.stop();
        this.toastr.warning("please fill valid birth year");
      } else {
        var ageDifMs = Date.now() - birth.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age > 18) {
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
    console.log('child image before', child);
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
      child.avtar = child.avtar.split(this.baseUrl).pop();
      // child.avtar =  child.avtar.slice(21);
      console.log('data image before', child);
      this.apiservice.updateChild(child.id, child).subscribe((res: any) => {
        console.log('data image', res);
        this.getProfileProgress();
        this.headerComponent.getProfileProgress();
        this.headerComponent.getUserById();
        if (res) {
          this.onChildren(this.currentUser.id);
          // this.toastr.info(msg );
        } else {
          if (this.currentUser === null || this.currentUser === undefined) {
            this.router.navigate(["/login"]);
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
        this.isEmailnotification = true;
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
  checkOrUncheckAllTags(e, categoryIndx) {
        if (e.target.checked === true) {
          this.subCategoryCheckbox[categoryIndx] = true;
        } else {
          this.subCategoryCheckbox[categoryIndx] = false;
        }

  }
  checkOrUncheckTag(e,i,j) {
    if(e.target.checked){
      const value = (element) => element===false;
      console.log(this.subCategoryCheckbox.some(value))
      if(this.subCategoryCheckbox.some(value)){
        this.categoryChecked[i]=false
      }
        
       else {
        this.categoryChecked[i]=true
      }}
      else{
        this.categoryChecked[i]=false
      }
}
  ngOnInit() {
    this.dateV()
    this.getTagList()
    if (this.activeList == "kidList") {
      this.onChildren(this.currentUser.id);
    }
    else if (this.activeList == "savedList") {
      this.getFav(this.currentUser.id);
    }
    else if (this.sendInvite) {
      this.onInvite(this.currentUser.id)
    }
    else {
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
  ngOnDestroy(): void {
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
    data.name = data.name.replace(/ /g, "-");
    data.name = data.name.replace(/\?/g, "-");
    this.router.navigate(['program', data.name, data._id]);
  }

  copyInvite() {
    navigator.clipboard.writeText(`${this.baseUrl}ask-to-join?id=${this.user.id}`).then().catch(e => console.error(e));
    this.snack.open('Link copied', '', { duration: 500 });
  }

  inviteAsktojoina() {
    this.inviteAsktojoin.userId = this.user.id
    console.log(this.inviteAsktojoin)
    this.apiservice.InviteAsktojoin(this.inviteAsktojoin).subscribe((res: any) => {
      console.log(res)
      if (res.isSuccess === true) {
        this.betaProgramInvitedUsers(this.currentUser.id)
      }
      else {
        this.toastr.error(res.error);
      }
    })
  }
  betaProgramInvitedUsers(userId) {
    this.apiservice
      .getInvitedUsersByParent(userId)
      .subscribe((res: any) => {
        this.invitedUsers = res;
        console.log('invited users', this.invitedUsers)
      });
  }

  // ------------------------------------------get tags-----------------------------------------------------------------
  getTagList() {
    this.apiservice.getTag().subscribe((res: any) => {
      this.allTags = res.data;
      this.allTags = this.allTags.filter((item) => item.isActivated === true);
      this.allTags = this.allTags.sort((a, b) => b.programCount - a.programCount);
      console.log('allTags list', this.allTags)
    });
  }
}

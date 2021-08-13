
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
// import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Socket } from "ngx-socket-io";
import { ApiService } from "src/app/core/services/api.service.service";
import { environment } from "src/environments/environment";
import { AuthsService } from "src/app/core/services/auths.service";
import * as io from "socket.io-client";
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { User } from "src/app/core/models/user.model";
import { Chat, ChatService } from "src/app/core/services/chat.service";
import { Subscription } from "rxjs";

// const SOCKET_ENDPOINT = 'http://93.188.167.68:4500';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  users: any = new User();
  public activeContact: any = new User();
  currentUser: any = new User();
  isLoading: boolean;
  chatCollection: any[] = [];
  text: string;
  date = new Date();
  selectedIndex: number = null;
  chat: Chat = new Chat();
  typingMsg: string;
  pageNo: number = 1;
  pageSize: number = 40;
  currentRoom: any = {};
  roomId: string;
  chats: any = [];
  usersRole: any;
  isScrol: boolean = true;
  fileData: File = null;
  mediaIMG: any = "";
  loaderPostion = "center-center";
  loaderType = "ball-spin-clockwise";

  // @ViewChild(MatSidenav) public sideNav: MatSidenav;
  collection;

  constructor(
    public chatService: ChatService,
    private authService: AuthsService,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    
    private router: Router
  ) {
    this.currentUser = this.authService.currentUser();
    this.getUsers();
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
    this.isLoading = true;
    this.ngxLoader.start();
    this.apiservice
      .getUsers(this.usersRole = "all", this.pageNo, this.pageSize)
      .subscribe((res: any) => {
        this.ngxLoader.stop();
        this.users = res.items;
        console.log("users list", this.users);
      });
    this.ngxLoader.stop();
  }
  getOldChat() {
    this.isLoading = true;
    this.apiservice
      .getOldChat(this.roomId, this.pageNo, this.pageSize)
      .subscribe((res: any[]) => {
        this.chatCollection = res;
        console.log("old chat", res);
      });
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
    let currentRoom =
      this.currentUser.firstName + "-" + this.activeContact.firstName;
    let reverseRoom =
      this.activeContact.firstName + "-" + this.currentUser.firstName;
    this.chatService.setUser(this.currentUser.firstName);
    this.chatService.createRomm(currentRoom, reverseRoom);
    this.getRoomId();
    // this.getOldChat()
  }
  ngAfterViewInit() {
    // this.getUsers()
  }
  ngOnInit() {
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
  }

  getRoomId() {
    this.chatService.getRoomId().subscribe((id: string) => {
      this.roomId = id;
      console.log("roomId", this.roomId);
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
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.mediaIMG = reader.result;
    // var msgData = data
    // msgData.image = this.mediaIMG
    // this.chatCollection.push(msgData)
    // };
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
  // geMessaget() {
  //   let ms = this.chatService.getMessage()
  //   console.log('ms', ms)
  // }

  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }
  // changeActiveUser(user) {
  //   this.activeChatUser = user;
  // }
  // updateSidenav() {
  //   var self = this;
  //   setTimeout(() => {
  //     self.isSidenavOpen = !self.isMobile;
  //     self.sideNav.mode = self.isMobile ? 'over' : 'side';
  //   });
  // }
  // chatSideBarInit() {
  //   this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
  //   // this.updateSidenav();
  //   this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
  //     this.isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
  //     // this.updateSidenav();
  //   });
  // }
}

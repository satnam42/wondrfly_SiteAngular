import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/core/models';
import { LocalStorageService } from 'src/app/core/services';
import { ApiService } from 'src/app/core/services/api.service.service';
import { AuthsService } from 'src/app/core/services/auths.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  invitedUsers:User[] = []
  user = new User();
  inviteForm: FormGroup;
  inviteAsktojoin: any = {
    firstName:'',
    userId: this.user.id,
    email: "",
  };
  isParent: boolean;


  constructor( private apiservice: ApiService,
    private authService: AuthsService,
    public store: LocalStorageService,
    // private snack: MatSnackBar,
    private toastr: ToastrService,) {
  this.user  = this.authService.currentUser();
   }

   betaProgramInvitedUsers(userId){
    this.apiservice
    .getInvitedUsersByParent(userId)
    .subscribe((res: any) => {
      this.invitedUsers = res;
      console.log('invited users',this.invitedUsers)
    });
  }

   inviteAsktojoina(){
    this.inviteAsktojoin.userId = this.user.id
    console.log(this.inviteAsktojoin)
    this.apiservice.InviteAsktojoin(this.inviteAsktojoin).subscribe((res:any) => {
      console.log(res)
      if(res.isSuccess===true){
        this.betaProgramInvitedUsers(this.user.id)
      }
      else{
        this.toastr.error(res.error);
      }
    })
  }

   parentChecked(value:boolean) {
    this.isParent=value
  }

   copyInvite(){
    navigator.clipboard.writeText(`https://www.wondrfly.com/ask-to-join/${this.user.id}`).then().catch(e => console.error(e));
          //  this.snack.open('Link copied','', { duration: 500 });
  }


  ngOnInit(): void {

    this.inviteForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

}

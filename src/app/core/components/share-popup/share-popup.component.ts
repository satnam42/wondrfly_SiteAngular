import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'share-popup',
  template: `

<div class="modal fade" id="ShareModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content share-modals">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close_sharemodal">
            <span aria-hidden="true" class="icon-close"></span>
        </button>
        <h2>Share</h2>
        <div class="sharethisall-icons">
            <hr class="N_line">
        <div class="sharethis-social"  (click)="genericSocialShare('facebook')">
            <img src="assets/shareface.svg">
            <span class="sharethis-text">Facebook</span>
        </div>
        <hr class="N_line">
        <div class="sharethis-social" (click)="genericSocialShare('messenger')">
          <img src="assets/sharemesseng.svg">
          <span  class="sharethis-text">Messenger</span>
        </div>
        <hr class="N_line">
        <div class="sharethis-social" (click)="genericSocialShare('email')">
          <img src="assets/sharemail.svg">
          <span  class="sharethis-text">Email</span>
        </div>
        <hr class="N_line">
        <div class="sharethis-social" (click)="genericSocialShare('whatsapp')">
          <img src="assets/sharewsup.svg">
          <span  class="sharethis-text">Whatsapp</span>
        </div>
        <hr class="N_line">
          <div style="cursor:copy" class="sharethis-social" (click)="genericSocialShare('copylink')">
            <img src="assets/sharecopylink.svg">
            <span  class="sharethis-text">Copylink</span>
          </div>


        <!-- <hr class="N_line"> -->
        <!-- <div class="sharethis-social">
            <span class="st_sharethis_large" st_url="https://wondrfly.com" displayText="ShareThis"></span>
            <span class="sharethis-text">ShareThis</span>
        </div> -->
        </div>


    </div>
</div>
</div>
`,
  styleUrls: ['./share-popup.component.css']
})


export class SharePopupComponent implements OnInit {
  @Input() shareData: any;
  baseUrl= environment.baseUrl;
  shareUrl:string;
  url: string;
  constructor(private snack:MatSnackBar) { }
  ngOnInit() {
  }
//----------------------------------------share activity or program detail in social media  ---------------------------------------------------------

genericSocialShare(provider) {
let name = this.shareData.name;
name = name.toLowerCase();
name = name.replace(/ /g,"-");
name = name.replace(/\?/g,"-");
  this.shareUrl=`${this.baseUrl}program/${name}/${this.shareData._id}`;
  console.log('share url ',this.shareUrl)

     switch (provider) {
       case 'facebook': {
         this.url = `https://www.${provider}.com/sharer/sharer.php?u=${this.shareUrl}`;
         window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }
       case 'email': {
        navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
         this.url = `mailto:?subject=wondrfly&amp;body=${this.shareUrl}`;
         window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }
       case 'whatsapp': {
         this.url = `https://api.${provider}.com/send?text=${this.shareUrl}`;
         window.open( this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
         return true;
       }
       case 'messenger': {
        navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
         window.open( 'https://m.me', 'sharer', 'toolbar=0,status=0,width=1000,height=600');
         return true;
       }
       case 'copylink': {
         navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
         this.snack.open('Link copied','', { duration: 500 });
            // this.url = `${encodeURIComponent(this.baseUrl)}program/detail/${this.selectedProgramId}`;
       }

     }

   }
}

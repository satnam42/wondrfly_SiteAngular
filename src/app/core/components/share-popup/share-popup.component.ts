import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'share-popup',
  templateUrl: './share-popup.component.html',
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

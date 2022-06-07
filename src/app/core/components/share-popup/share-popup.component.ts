import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
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
            <!-- <hr class="N_line">
        <div class="sharethis-social"  (click)="genericSocialShare('facebook')">
            <img src="assets/shareface.svg">
            <span class="sharethis-text">Facebook</span>
        </div>
        <hr class="N_line">
        <div class="sharethis-social" (click)="genericSocialShare('messenger')">
          <img src="assets/sharemesseng.svg">
          <span  class="sharethis-text">Messenger</span>
        </div> -->
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
  baseUrl = environment.baseUrl;
  shareUrl: string;
  @Input() isProvider: boolean;
  url: string;
  constructor(private snack: MatSnackBar,
    private toastr: ToastrService
    ) { }
  ngOnInit() {
  }
  //----------------------------------------share activity or program detail in social media  ---------------------------------------------------------

  genericSocialShare(provider) {
    let name:any
    let subject:any
    let emailSubject:any
    let emailBody:any
    let id
    if(this.isProvider){
      name = this.shareData.user ? this.shareData.user[0].firstName : this.shareData?.provider?.firstName;
      name = name.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/\?/g, "-");
      name = name.replace(/[{()}]/g, '');
      name = name.replace(/\//g, '-');
      id = this.shareData.user ? this.shareData.user[0]._id : this.shareData?.provider?._id;

      subject = "Check out this activity provider on Wondrfly:"
      emailSubject = "Check out this activity provider on Wondrfly:"
      emailBody = "Check out this activity provider on Wondrfly!"
      this.shareUrl = `${this.baseUrl}provider/program-provider/${name}/${id}`;
    }
    else{
      name = this.shareData.name;
      name = name.toLowerCase();
      name = name.replace(/ /g, "-");
      name = name.replace(/\?/g, "-");
      name = name.replace(/[{()}]/g, '');
      name = name.replace(/\//g, '-');
      subject = "Check out this kids' activity on Wondrfly:"
      emailSubject = "Check out this kids' activity on Wondrfly!"
      emailBody = "Check out this kids' activity on Wondrfly!"
      this.shareUrl = `${this.baseUrl}program/${name}/${this.shareData._id}/filter`;
    }

    switch (provider) {
      case 'facebook': {
        this.url = `https://www.${provider}.com/sharer/sharer.php?u=${subject} ${this.shareUrl}`;
        window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
        return true;
      }
      case 'email': {
        navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
        this.url = `mailto:?subject=${emailSubject}&body=${emailBody} ${this.shareUrl}`;
        window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
        return true;
      }
      case 'whatsapp': {
        this.url = `https://api.${provider}.com/send?text=${subject} ${this.shareUrl}`;
        window.open(this.url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
        return true;
      }
      case 'messenger': {
        navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
        window.open('https://m.me', 'sharer', 'toolbar=0,status=0,width=1000,height=600');
        return true;
      }
      case 'copylink': {
        navigator.clipboard.writeText(this.shareUrl).then().catch(e => console.error(e));
        // this.snack.open('Link copied', '', { duration: 500 });
        this.toastr.success('Link copied');
      }

    }

  }
}

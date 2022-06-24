import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { th } from 'date-fns/locale';
import { CookieService } from 'ngx-cookie-service';
import { AuthsService } from '../../services/auths.service';

@Component({
  selector: 'app-cookies-popup',
  templateUrl: './cookies-popup.component.html',
  styleUrls: ['./cookies-popup.component.css']
})
export class CookiesPopupComponent implements OnInit {
  cookiesData: any
  currentUser: any;
  @Output() cookiesDataIdentify:EventEmitter<string>= new EventEmitter();  
  // @Output() myOutput:EventEmitter<string>= new EventEmitter();  

  constructor(private cookies: CookieService,
    private auth: AuthsService) {
    this.currentUser = this.auth.currentUser();
    this.cookiesData = this.cookies.get('_ui');
   }
  // ---accept coockies
   acceptCookies(){
      if(this.currentUser){
      this.cookies.set('_ui', this.currentUser.id);
      }
      else{
        this.cookies.set('_ui', 'anonymous',30);
      }
      this.cookiesData = this.cookies.get('_ui');
      this.cookiesDataIdentify.emit(this.cookiesData)
     }
  // ---decline coockies
     decline(){
      if(this.currentUser){
      this.cookies.set('_ui', this.currentUser.id,7);
      }
      else{
        this.cookies.set('_ui', 'anonymous',7);
      }
      this.cookiesData = this.cookies.get('_ui');
      this.cookiesDataIdentify.emit(this.cookiesData)
     }

  ngOnInit(){
    this.cookiesData = this.cookies.get('_ui');
  }

}

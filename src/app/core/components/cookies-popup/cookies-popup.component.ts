import { Component, OnInit } from '@angular/core';
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
  constructor(private cookies: CookieService,
    private auth: AuthsService) {
    this.currentUser = this.auth.currentUser();
    this.cookiesData = this.cookies.get('_ui');
   }

   acceptCookies(){
      // this.cookies.set('isTour', '0');
      if(this.currentUser){
      this.cookies.set('_ui', this.currentUser.id,30);
      }
      else{
        this.cookies.set('_ui', 'anonymous');
      }
      this.cookiesData = this.cookies.get('_ui');
      // this.cookiesData = this.cookies.get('isTour');
     }

     decline(){
      // this.cookies.set('isTour', '!');
      // this.cookiesData = this.cookies.get('isTour');
      // this.cookies.set('isTour', '0');
      if(this.currentUser){
      this.cookies.set('_ui', this.currentUser.id,7);
      }
      else{
        this.cookies.set('_ui', 'anonymous',7);
      }
      this.cookiesData = this.cookies.get('_ui');
      // this.cookiesData = this.cookies.get('isTour');
     }

  ngOnInit(){
    this.cookiesData = this.cookies.get('_ui');
    console.log('cookiesdata', this.cookiesData)
  }

}

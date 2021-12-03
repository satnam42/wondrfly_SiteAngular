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
   }

   acceptCookies(){
    if(this.currentUser){
      this.cookies.set('X-Auth-Token', 'cookies');
      this.cookiesData = this.cookies.get('X-Auth-Token');
      }
   }

  ngOnInit(){
   
  }

}

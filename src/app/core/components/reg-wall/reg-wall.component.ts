import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthsService } from '../../services/auths.service';

@Component({
  selector: 'reg-wall',
  templateUrl: './reg-wall.component.html',
  styleUrls: ['./reg-wall.component.css']
})
export class RegWallComponent implements OnInit {
  isShow: boolean;
  isLogin: boolean;
  activitySearched = 0
  // activityClicked = 0
  // blogsVisited = 0
  regWall = 0
  currentUser :any
  routeName=''
  isRegWall:boolean;
  constructor(private cookies:CookieService,
    private auth: AuthsService,
    private cookiesData: CookieService,
    private router:Router
   ) {
    this.routeName = this.router.url;
  if (this.routeName =="/ask-to-join" || this.routeName == "/login") {
    this.isRegWall =false;
  }
  else{
    this.isRegWall =true
  }
  this.currentUser = this.auth.currentUser();
  // this.blogsVisited = Number(this.cookies.get('blogsVisited'))
  // this.activityClicked = Number(this.cookies.get('activityClicked'))
  // this.activitySearched = Number(this.cookies.get('activitySearched'))
  // if (this.activitySearched > 3 || this.activityClicked > 10 || this.blogsVisited>2) {
  //   this.isShow = true
  // }
  this.regWall = Number(this.cookies.get('regWall'))
    this.activitySearched = Number(this.cookies.get('activitySearched'))
  if(!this.regWall && this.activitySearched){
  this.isShow = true
  }
  if(this.currentUser){
    this.isLogin=true
  }
   }
  ngOnInit() {
  }

}

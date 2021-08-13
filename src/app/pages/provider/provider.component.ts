import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  isLogin = false;
  userData: any = {};
  routeName: string;
  hideHeaderFooter: boolean=false;

  constructor() {
    if(this.routeName === '/loginProvider'){this.hideHeaderFooter=true}
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
   }

  ngOnInit(): void {
  }

}

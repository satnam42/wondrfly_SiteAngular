import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  isLogin = false;
  userData: any = {};

  constructor() {
    this.userData = JSON.parse(localStorage.getItem('CurrentUserWondrfly'));
    if (this.userData) {
      this.isLogin = true;
    }
   }

  ngOnInit(): void {
  }

}

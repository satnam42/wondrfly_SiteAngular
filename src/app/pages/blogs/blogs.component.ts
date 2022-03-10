import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';

@Component({
  selector: 'app-ambassador-policy',
  templateUrl: './ambassador-policy.component.html',
  styleUrls: ['./ambassador-policy.component.css']
})
export class AmbassadorPolicyComponent implements OnInit {
  isMap: boolean = true;
  isLogin = false;
  userData: any = {};
  pickDate: any;
  pageNo: number = 1;
  pageSize: number;
  forums: any;
  constructor(private router: Router,
    private apiservice: ApiService) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
  }

  search() {
    this.router.navigate(['/search']);
  }

  ngOnInit() {
    window.scroll(0, 0);
  }
}

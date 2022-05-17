import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reg-wall',
  templateUrl: './reg-wall.component.html',
  styleUrls: ['./reg-wall.component.css']
})
export class RegWallComponent implements OnInit {
  isShow: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}

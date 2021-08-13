import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models';
import { ApiService } from '../../services/api.service.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()rating:any;
  @Input()user:any;
  constructor(private apiservice: ApiService) {
  }
  ngOnInit() {
}
}

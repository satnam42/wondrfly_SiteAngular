import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './core/models';
import { CanonicalService } from './core/shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  subscription: Subscription;
  envName: string;

  currentUser: any = new User;
  isLogin = false;
  constructor(
    private canonicalService: CanonicalService, ) {
    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
  }

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
    ;
  }
}

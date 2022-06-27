import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { CanonicalService } from './core/shared/canonical.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';
import { AuthsService } from './core/services/auths.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName: string;
  currentOS = null;
  cookiesData: string;
  versionData:string = '0.0.2'
  constructor(
    private canonicalService: CanonicalService,
    private deviceService: DeviceDetectorService,
    private cookies: CookieService) {
      this.cookiesData = this.cookies.get('_ui');
    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
    let version =  this.cookies.get('_v');
    if(this.versionData !== version){
      this.cookies.deleteAll();
      this.cookies.set('_v', this.versionData);
  }
  }
  checkCookieData(data) {
    this.cookiesData = data
  }
  ngOnInit() {
    this.cookiesData = this.cookies.get('_ui');
    this.canonicalService.setCanonicalURL();
    this.deviceDetector();
  }
  deviceDetector() {
    this.currentOS = this.deviceService.getDeviceInfo().os;
  }
}

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
  versionData:string = '0.0.1'
  constructor(
    private canonicalService: CanonicalService,
    private deviceService: DeviceDetectorService,
    private cookies: CookieService) {
      this.cookiesData = this.cookies.get('_ui');
    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
    let versionData =  this.cookies.get('_v');
    if(this.versionData !== versionData){
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

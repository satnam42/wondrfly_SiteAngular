import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { CanonicalService } from './core/shared/canonical.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName: string;
  currentOS = null;
  cookiesData: string;
  constructor(
    private canonicalService: CanonicalService,
    private deviceService: DeviceDetectorService,
    private cookies: CookieService) {
    this.cookiesData = this.cookies.get('_ui');
    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
  }
  checkCookieData(data) {
    this.cookiesData = data
    console.log(this.cookiesData)
    console.log(data)

  }
  ngOnInit() {
    this.cookiesData = this.cookies.get('_ui');
    this.canonicalService.setCanonicalURL();
    this.deviceDetector();
  }
  deviceDetector() {
    this.currentOS = this.deviceService.getDeviceInfo().os;
    console.log(this.currentOS);
  }
}

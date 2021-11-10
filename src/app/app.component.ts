import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { CanonicalService } from './core/shared/canonical.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName: string;
  currentOS = null;
  constructor(
    private canonicalService: CanonicalService,
    private deviceService: DeviceDetectorService ) {
    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
  }

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
   this.deviceDetector();
  }
  deviceDetector() {
    this.currentOS = this.deviceService.getDeviceInfo().os;

    console.log(this.currentOS);
  }
}

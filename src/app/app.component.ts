import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { CanonicalService } from './core/shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName: string;
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

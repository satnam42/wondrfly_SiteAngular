import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './core/models';
import { AuthsService } from './core/services/auths.service';
import { CanonicalService } from './core/shared/canonical.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  envName: string;

  currentUser: any = new User;
  isLogin = false;
  constructor(private router: Router,
    private auth: AuthsService,
    private activatedRoute: ActivatedRoute,
    private canonicalService: CanonicalService,
    private metaService: Meta
     ) {


    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
  

    // this.router.events.filter((event: any) => event instanceof NavigationEnd).subscribe(event => {
    //   this.routeName = event.url;
    // });
  }


  ngOnInit() {
    this.canonicalService.setCanonicalURL();
    this.metaService.addTags([
      { name: 'keywords', content: 'Best Activities and Programs, activities near me for toddlers, fitness classes for kids, online music lessons, online art classes' }
    ])
  }

  ngOnDestroy() {
  }

}

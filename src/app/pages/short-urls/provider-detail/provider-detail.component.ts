import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
})
export class ProviderDetailComponent implements OnInit {
  username = ''
  constructor(private apiservice: ApiService, private activatedRoute: ActivatedRoute,private router:Router) {
    this.activatedRoute.params.subscribe(params => {
      let username = params['username'];
      this.getUserByUsername(username)
    });
  }

  ngOnInit(): void {
  }
  getUserByUsername(key) {
    this.apiservice.getUserByUsername(key).subscribe((res: any) => {
      console.log(res)
       let  providerName = 'provider name';
        providerName = providerName.replace(/ /g, "-");
        providerName = providerName.replace(/\?/g, "-");
        providerName = providerName.replace(/\//g, "-");
        this.router.navigate(['provider/program-provider', providerName, '60b7234dc995bc5de57f1184']);
      
    })
  }
}

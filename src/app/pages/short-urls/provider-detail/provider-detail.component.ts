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
      if(res.isSuccess){
        if(res.data!==null){
          let  providerName = res.data.firstName;
          providerName = providerName.replace(/ /g, "-");
          providerName = providerName.replace(/\?/g, "-");
          providerName = providerName.replace(/\//g, "-");
          this.router.navigate(['provider/program-provider', providerName, res.data._id]);
        }
        else{
          this.router.navigate(['404']);
        }
      }
      else{
        this.router.navigate(['404']);
      }
    })
  }
}

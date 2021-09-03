import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from 'src/app/pages/search/search.component';
import { Globals } from '../../common/imageLoader';
import { ApiService } from '../../services/api.service.service';
import { DataService } from '../../services/dataservice.service ';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  logoPosition=false;
  searchBar=false;
  routeName: string;
  categoriesBySearch: any;
  filterData: any = {
    subcatId: '',
    activityName: '',
  }
  providersBySearch: any;
  @ViewChild(SearchComponent, { static: true }) footerComponent: SearchComponent;
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private dataservice: DataService
  ) {
    this.routeName = this.router.url;
    if (this.routeName === '/search') {
      this.logoPosition=true;
    }
    if(this.routeName === '/search'|| this.routeName === '/'){ this.searchBar=true}
   }
   searchActivityByNameDate() {
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }
  logo() {
    if(this.logoPosition){
      this.router.navigate(['']);
}else{
this.router.navigate(['/search']);
}
  }
  ngOnInit() {
  }

  searchSubCategory(key){
    this.apiservice.searchTag(key).subscribe((res:any)=>{
  this.categoriesBySearch = res;
    })
  }

  providerSearch(key){
    this.apiservice.searchUsers(key,'provider').subscribe((res:any)=>{
      this.providersBySearch = res.data;
    })
  }

  searchActivityByCategory(id) {
    this.filterData.activityName=''
    this.filterData.subcatId = id
    this.dataservice.setOption(this.filterData)
    this.router.navigate(['/search']);
  }

  goToProviderProfile(provider) {
    this.filterData.activityName=''
    provider.firstName = provider.firstName.toLowerCase();
    provider.firstName = provider.firstName.replace(/ /g,"-");
    provider.firstName = provider.firstName.replace(/\?/g,"-");
      this.router.navigate(['/program-provider', provider.firstName, provider._id]);
  }

}

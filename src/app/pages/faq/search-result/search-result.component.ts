
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service.service';
import { DataService } from 'src/app/core/services/dataservice.service ';

@Component({
  selector: 'faq-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchData: any;
  filterData: string;
  title = 'Frequently Asked Questions - Wondrfly';
  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private dataservice: DataService,
    private titleService: Title,
    private metaTagService: Meta,
    private apiservice: ApiService
  ) {
    this.filterData = dataservice.getOption();
    this.activatedroute.params.subscribe(data => {
      this.searchData = data;
    })

  }

  ngOnInit() {
    this.metaService()
  }
  metaService() {
    this.apiservice.getMetaServiceByPageName('faq').subscribe(res => {
      if (res.isSuccess) {
        if (res.data !== null) {
          this.titleService.setTitle(res.data.title);
          this.metaTagService.updateTag(
            { name: 'description', content: res.data.description }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: res.data.keywords }
          );
        }
        else {
          this.titleService.setTitle(this.title);
          this.metaTagService.updateTag(
            { name: 'description', content: "Check out our FAQ section to find out some of the most frequently asked questions about the online classes for kids. Visit our website for more info." }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'frequently asked questions about kids activities, fun questions for kids' }
          );
        }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: "Check out our FAQ section to find out some of the most frequently asked questions about the online classes for kids. Visit our website for more info." }
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'frequently asked questions about kids activities, fun questions for kids' }
        );
      }
    })

  }
}

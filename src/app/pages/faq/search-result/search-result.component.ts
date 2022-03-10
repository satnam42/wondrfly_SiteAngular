
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/dataservice.service ';

@Component({
  selector: 'faq-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchData: any;
  filterData: string;
  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private dataservice: DataService,
  ) {
    console.log('data from service', dataservice.getOption());
    this.filterData = dataservice.getOption();
    console.log('filter data', this.filterData);

    this.activatedroute.params.subscribe(data => {
      this.searchData = data;
      console.log('data on url', this.searchData);
    })

  }

  ngOnInit() {


  }
}

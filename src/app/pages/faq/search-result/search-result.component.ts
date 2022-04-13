
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
    this.filterData = dataservice.getOption();
    this.activatedroute.params.subscribe(data => {
      this.searchData = data;
    })

  }

  ngOnInit() {


  }
}

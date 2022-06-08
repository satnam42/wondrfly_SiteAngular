import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';

@Component({
  selector: 'app-search-topics',
  templateUrl: './search-topics.component.html',
})
export class SearchTopicsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private apiservice: ApiService,private router:Router) {
    this.activatedRoute.params.subscribe(params => {
      let topic = params['topicname'];
      this.searchTopic(topic)
    });
  }

  ngOnInit(): void {
  }
  searchTopic(key) {
    this.apiservice.searchTopic(key).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['search'])
    })
  }
}

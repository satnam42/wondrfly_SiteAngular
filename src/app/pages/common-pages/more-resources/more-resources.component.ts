import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-more-resources',
  templateUrl: './more-resources.component.html',
  styleUrls: ['./more-resources.component.css']
})
export class MoreResourcesComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  resources: any;

  constructor() { 
    this.getResources()
  }


   // ------------------------------------------------get resources  -------------------------------------------

   getResources() {
    axios.get(`${this.blogUrl}/resources`).then(response => {
      this.resources = response.data
      console.log('resources',this.resources)
    });
  }


  ngOnInit(): void {
  }

}

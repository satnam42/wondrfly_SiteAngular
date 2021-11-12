import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-more-resources',
  templateUrl: './more-resources.component.html',
  styleUrls: ['./more-resources.component.css']
})
export class MoreResourcesComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  resources: any;

  
  constructor() { 
    this.getPrintables()
  }


   // ------------------------------------------------get resources  -------------------------------------------

   getPrintables() {
    axios.get(`${this.blogUrl}/printables?_sort=published_at:DESC`).then(response => {
      this.resources = response.data
      console.log('resources',this.resources)
    });
  }

  downloadFile(file){
    FileSaver.saveAs(this.blogUrl+file.url,file.name);
  }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-about-join-beta',
  templateUrl: './about-join-beta.component.html',
  styleUrls: ['./about-join-beta.component.css']
})
export class AboutJoinBetaComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  categories:any =[];
  quesData: any;
  plus: boolean=true
  minus: boolean=false
  constructor() { }

     // ------------------------------------------------get  category  -------------------------------------------
     getParentCategory(){
      const responcee = axios.get(`${this.blogUrl}/parent-faq-categories/8`).then(response => {
        this.categories = response.data
        console.log(this.categories)
      });
      }

  ngOnInit(): void {
    this.getParentCategory()
  }

}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/core/services/dataservice.service ';
@Component({
  selector: 'faq-home',
  templateUrl: './faq-home.component.html',
  styleUrls: ['./faq-home.component.css']
})
export class FaqHomeComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  userData = new User;
  isLogin = false;
  parentCategories:any;
  providerCategories:any;
  questions: any;
  parentQuestions: any;
  providerQuestions: any;
  allQuestions: any = []
  term: string;
  title = 'Frequently Asked Questions - Wondrfly';

  constructor(private router: Router,
    private dataservice: DataService,
    private titleService: Title,
    private metaTagService: Meta,) {

    this.getParentCategory()
    this.getProviderCategory()
    this.getParentQuestions()

  }

  // ------------------------------------------------get category  -------------------------------------------

  getParentCategory(){
    const responcee = axios.get(`${this.blogUrl}/parent-faq-categories`).then(response => {
      this.parentCategories = response.data
      console.log( 'data on parentCategories axios', this.parentCategories);
    });
    }

     // ------------------------------------------------get provider category  -------------------------------------------

  getProviderCategory(){
    const responcee = axios.get(`${this.blogUrl}/provider-faq-categories`).then(response => {
      this.providerCategories = response.data
      console.log( 'data on providerCategories axios', this.providerCategories);
    });
    }

    // ------------------------------------------------get questions parent  -------------------------------------------

  getParentQuestions(){
    const responcee = axios.get(`${this.blogUrl}/parent-faq-questions`).then(response => {
      this.parentQuestions = response.data
      console.log( 'data on parentQuestions axios', this.parentQuestions);
      for(let item of this.parentQuestions){
        this.allQuestions.push(item)
      }

    });
    this.getProviderQuestions();
    }

     // ------------------------------------------------get questions provider  -------------------------------------------

  getProviderQuestions(){
    const responcee = axios.get(`${this.blogUrl}/provider-faq-questions`).then(response => {
      this.providerQuestions = response.data
      console.log( 'data on providerQuestions axios', this.providerQuestions);
      for(let item of this.providerQuestions){
        this.allQuestions.push(item)
      }
    });
    }

    // searchData(data){
    //   this.router.navigate(['/faq', data])
    // }

    selectQues(ques){
      var question = ques.question;
      question = question.toLowerCase();
      question = question.replace(/ /g,"-");
      question = question.replace(/\?/g,"-");
      this.router.navigate(['/faq',ques.role, question, ques.id])
    }


  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Check out our FAQ section to find out some of the most frequently asked questions about the online classes for kids. Visit our website for more info." }
    );

    console.log('all questions', this.allQuestions)
   }
   goToResultPage(data){
    this.dataservice.setOption(data)
    this.router.navigate(['/faq/search']);
   }
}

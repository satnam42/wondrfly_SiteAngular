
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'faq-help-desk',
  templateUrl: './faq-help-desk.component.html',
  styleUrls: ['./faq-help-desk.component.css']
})
export class FaqHelpDeskComponent implements OnInit {
  blogUrl = environment.blogsUrl;
  categories: any = [];
  quesData: any;
  plus: boolean = true
  minus: boolean = false
  title = 'Frequently Asked Questions (FAQs)  - Wondrfly';
  ans: any = [];
  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private apiservice:ApiService
  ) {

    this.activatedroute.params.subscribe(data => {
      this.quesData = data;
      if (this.quesData.role === 'parent') {
        this.getParentCategory()
        this.getParentQues()
      } else if (this.quesData.role === 'visitor') {
        this.getProviderCategory()
        this.getProviderQues()
      }
    })


  }

  // ------------------------------------------------get  category  -------------------------------------------
  getParentCategory() {
    const responcee = axios.get(`${this.blogUrl}/parent-faq-categories`).then(response => {
      this.categories = response.data
      for (let categoryIndx in this.categories) {
        for (let ques of this.categories[categoryIndx].questions) {
          if (this.quesData.id == ques.id) {
            this.categories[categoryIndx].collapsed = true
          }
        }
      }
    });
  }

  // ------------------------------------------------get provider category  -------------------------------------------

  getProviderCategory() {
    const responcee = axios.get(`${this.blogUrl}/provider-faq-categories`).then(response => {
      this.categories = response.data
      for (let categoryIndx in this.categories) {
        for (let ques of this.categories[categoryIndx].questions) {
          if (this.quesData.id == ques.id) {
            this.categories[categoryIndx].collapsed = true
          }
        }
      }
    });
  }

  // ------------------------------------------------get parent category question by id -------------------------------------------
  getParentQues() {
    const responcee = axios.get(`${this.blogUrl}/parent-faq-questions/?id=${this.quesData.id}`).then(response => {
      this.ans = response.data
    });
  }


  // ------------------------------------------------get provider question by id  -------------------------------------------
  getProviderQues() {
    const responcee = axios.get(`${this.blogUrl}/provider-faq-questions/?id=${this.quesData.id}`).then(response => {
      this.ans = response.data
    });
  }



  clickQuestion(item) {
    window.scroll(0, 0);
    this.quesData = item;
    let data = item;
    if (this.quesData.role === 'parent') {
      this.getParentQues()
    } else if (this.quesData.role === 'provider') {
      this.getProviderQues()
    }
    var question = data.question;
    question = question.toLowerCase();
    question = question.replace(/ /g, "-");
    question = question.replace(/\?/g, "-");
    this.router.navigate(['/faq', data.role, question, data.id])
  }

  plusMinus(i) {
    window.document.getElementById(i).click();
    this.plus = false
    this.minus = true
  }


  ngOnInit() {
this.metaService()
    window.scroll(0, 0);
  }
  metaService(){
    this.apiservice.getMetaServiceByPageName('faq-help-desk').subscribe(res=>{
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
            { name: 'description', content: "If you have any queries about kids activities classes, programs or camps you can visit our Frequently Asked Questions (FAQs) section. Visit Wondrfly's website." }
          );
          this.metaTagService.addTag(
            { name: 'keywords', content: 'frequently asked questions about kids activities, fun questions for kids' }
          );  }
      }
      else {
        this.titleService.setTitle(this.title);
        this.metaTagService.updateTag(
          { name: 'description', content: "If you have any queries about kids activities classes, programs or camps you can visit our Frequently Asked Questions (FAQs) section. Visit Wondrfly's website." }
        );
        this.metaTagService.addTag(
          { name: 'keywords', content: 'frequently asked questions about kids activities, fun questions for kids' }
        ); }
    })

  }
}

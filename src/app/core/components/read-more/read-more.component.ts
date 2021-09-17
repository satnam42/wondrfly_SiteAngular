import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-more',
  template: `
  <div [innerHtml]="content | markdown">
  <div *ngIf="!blogData"><a  class="blue_heading cursor"*ngIf="!isContentToggled" (click)="toggleContent()" i18n>
    <!-- Learn More -->
  </a>
    <a  class="blue_heading cursor"*ngIf="isContentToggled" (click)="toggleContent()" i18n>Less</a>
</div>
<a  class="blue_heading cursor" *ngIf="blogData" (click)="blogDetail()" i18n>
  Learn More</a>
 </div>
`,
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {

  @Input() content: string;
  @Input() limit: number;
  @Input() completeWords: boolean;
  @Input() blogData: any;
  isContentToggled: boolean;
  nonEditedContent: string;
  constructor(private router: Router
  ) {

  }

  ngOnInit() {
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substr(0, this.limit).lastIndexOf(' ');
    }
    return `${content.substr(0, this.limit)}...`;
  }
  blogDetail() {
    this.blogData.title = this.blogData.title.toLowerCase();
    this.blogData.title = this.blogData.title.replace(/ /g,"-");
    this.blogData.title = this.blogData.title.replace(/\?/g,"-");
    this.router.navigate(['blogs/',this.blogData.title,this.blogData.id])
  }

}

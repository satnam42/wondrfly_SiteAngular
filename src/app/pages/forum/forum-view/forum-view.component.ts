
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user.model'
import { Forum } from 'src/app/core/models/forum.model';
import { AuthsService } from 'src/app/core/services/auths.service';

@Component({
  selector: 'forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.css']
})
export class ForumViewComponent implements OnInit {
  commentForm: FormGroup;
  forum: any = new Forum;
  user = new User;
  comment = new Forum;
  isRecent = 'disabled';
  isOlder = '';
  sortBy = 'Recent';

  constructor(private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private auth: AuthsService) {
    this.user = this.auth.currentUser();
    this.auth.userChanges.subscribe(user => this.user = user)
    this.activatedRoute.params.subscribe(params => {
      this.forum._id = params['id'];
    });
  }
  forumById() {
    this.apiservice.forumById(this.forum._id).subscribe(res => {
      this.forum = res;
      this.forum.comments = this.forum.comments.reverse();
      console.log('forum by id>>>>>>', this.forum);
    });
  }
  forumLike() {
    var like: any = {
      userId: this.user.id,
      postId: this.forum._id
    }
    this.apiservice.forumLike(like).subscribe(res => {
      console.log('like', res);
      return this.forumById();
    });
  }
  addComment() {
    var response: any;
    this.comment.text = this.commentForm.value.text;
    this.comment.postId = this.forum._id;
    this.comment.creator = this.user.id;
    this.comment.creatorName = this.user.firstName;
    this.apiservice.addComment(this.comment).subscribe(res => {
      response = res;
      console.log('comment add response', response);

      if (response.isSuccess === true) {
        return this.forumById();
      }
    });
  }
  sortingComment(data, sortBy: string) {
    if (sortBy === 'Recent') {
      this.sortBy = sortBy;
      this.isRecent = 'disabled';
      this.isOlder = '';
      data.reverse();
    }
    if (sortBy === 'Older') {
      this.sortBy = sortBy;
      this.isOlder = 'disabled';
      this.isRecent = '';
      data.reverse();
    }
  }

  ngOnInit() {
    this.forumById();
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Comment } from 'src/app/models/comment.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-post',
  templateUrl: './tutorial-comment-post.html',
  styleUrls: ['./tutorial-comment-post.css'],
})
export class TutorialCommentPost implements OnInit {
  comment: Comment = {
    content: '',
  };
  @Input() tutorialId: any;
  @Input() timeZone: any;
  tutorial: Tutorial = {
    title: '',
    description: '',
    categories: [],
  };
  commentDetails?: any;

  submitted = false;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCommentByTutorialId(this.tutorialId);
  }
  onSubmit() {
    alert(
      'Form Submitted succesfully!!!\n Check the values in browser console.'
    );
  }

  async saveComment() {
    this.submitted = true;
    const commentData = {
      content: this.comment.content,
      tutorialId: this.tutorialId,
    };
    await this.tutorialService.createComment(commentData);
  }

  async getCommentByTutorialId(id: Number) {
    const data = await this.tutorialService.getCommentByTutorialId(id);
    this.commentDetails = data;
  }
}

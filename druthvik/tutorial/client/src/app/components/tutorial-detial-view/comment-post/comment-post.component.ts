import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Comment } from 'src/app/models/comment.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css'],
})
export class CommentPostComponent implements OnInit {
  comment: Comment = {
    id: '',
    content: '',
    tutorialId: 0,
  };
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
  };
  commentDetails: any;

  @Input() tutorialId: any;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTutorialbyId(this.route.snapshot.params.id);
    this.getComment(this.tutorialId);
  }

  async getTutorialbyId(id: number) {
    this.tutorial = await this.tutorialService.getbyId(id);
  }
  async saveComment() {
    const data = {
      content: this.comment.content,
      tutorialId: this.tutorialId,
    };

    await this.tutorialService.createComment(data);
  }

  async getComment(id: Number) {
    this.commentDetails = await this.tutorialService.getCommentByTutorial(id);
  }
}

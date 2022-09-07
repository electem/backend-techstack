import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from 'src/app/models/comment.model';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css'],
})
export class CommentPostComponent implements OnInit {
  comment: Comments = {
    commentDescription: '',
  };
  commentdetails?: any;
  @Input() tutorialId: any;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCommentsBasedOnTutorilID(this.tutorialId);
  }

  async saveComments(): Promise<void> {
    const data = {
      commentDescription: this.comment.commentDescription,
      tutorial_id: this.tutorialId,
    };

    await this.tutorialService.createComment(data);
    this.router.navigate(['tutorials']);
  }

  async getAllCommentsBasedOnTutorilID(id: number): Promise<void> {
    this.commentdetails = await this.tutorialService.getAllComments(id);
  }
}

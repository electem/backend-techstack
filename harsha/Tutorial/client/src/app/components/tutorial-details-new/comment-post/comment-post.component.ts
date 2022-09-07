import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service'
import { Comments } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})

export class CommentPostComponent implements OnInit {
  comment: Comments={
    commentDescription:'',
  }
  commentdetails : any;
  @Input() tutorialId:any

  constructor(
    private tutorialService: TutorialService,
     ) { }

  ngOnInit(): void {
       this.getAllCommentsBasedOnTutorilID(this.tutorialId);
  }

  async getAllCommentsBasedOnTutorilID(id:number):Promise<void>{    
    this.commentdetails = await this.tutorialService.getAllCommentsBasedOnTutorilID(id)
  }

  async saveComment():  Promise<void> {
    const data = {
      commentDescription: this.comment.commentDescription,
      tutorialId: this.tutorialId,
    }
    await this.tutorialService.createComment(data)
}
}
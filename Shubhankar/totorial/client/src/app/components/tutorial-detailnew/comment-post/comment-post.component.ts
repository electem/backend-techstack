import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
 
 comment: Comment = { 
     content: '',
  };
  tutorial:Tutorial ={
    title: '',
    description:'',
    published: false,
    categories: [],
   };
  @Input() tutorialId:any
  @Input() timezone:any
  commentDetails?: any;
  
  constructor( private tutorialService: TutorialService, private route: ActivatedRoute) { }

 ngOnInit(): void {
   //this.getTutorialbyId(this.route.snapshot.params.id);
    this.getCommentTutorialbyId(this.tutorialId)
  }

  async getTutorialbyId(id: number) {
    this.tutorial = await this.tutorialService.getbyId(id);
  }

  async saveComment() {
   
    const  data = {
      content: this.comment.content,
      tutorialId: this.tutorialId
       };
       await this.tutorialService.createComment(data);
  }
  async getCommentTutorialbyId(id: number) {
    const comments = await this.tutorialService.getcomment(id);
    this.commentDetails =  comments;

  }
}

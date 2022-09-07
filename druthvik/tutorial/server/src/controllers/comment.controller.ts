import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Comment } from '../models';
import * as commentService from '../service/comment.service';
import {
  getComments,
  ICommentPayload,
  createComment,
} from '../repositories/comment.repository';

@Route('comments')
@Tags('Comment')
export default class CommentController {
  @Get('/')
  public async getComments(): Promise<Array<Comment>> {
    return getComments();
  }

  @Post('/')
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(body);
  }

  @Get('/:id')
  public async getCommentTutorial(@Path() id: string) {
    return commentService.getTutorialComment(Number(id));
  }
  // @Get('/:id')
  // public async getComment(@Path() id: string): Promise<Comment | null> {
  //   return getComment(Number(id));
  // }
}

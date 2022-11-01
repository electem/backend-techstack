import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Comment } from '../models';
import * as commentService from '../service/comment.service';
import {
  getComments,
  ICommentPayload,
  createComment,
  getTutorialComment1,
} from '../repositories/comment.repository';

@Route('comments')
@Tags('Comment')
export default class CommentController {
  @Get('/')
  public async getComments(): Promise<Array<Comment>> {
    return getComments();
  }

  @Post('/')
  public async createComment(
    @Body() body: ICommentPayload,
  ): Promise<Array<Comment>> {
    return await commentService.getTutorialComment1(
      body.tutorialId,
      body.timeZone,
    );
  }

  // @Get('/:id')
  // public async getComment(@Path() id: string): Promise<Comment | null> {
  //   return getComment(Number(id));
  // }
}

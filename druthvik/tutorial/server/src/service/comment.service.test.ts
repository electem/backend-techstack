import * as commentService from '../service/comment.service';
import { getRepository } from 'typeorm';

describe('getComments', () => {
  test('should return empty array', async () => {
    const commentsOfATutorial = [
      {
        id: 15,
        content: 'content3',
        createdAt: '2022-09-08T00:04:02.008Z',
        tutorialId: 89,
      },
    ];
    const zoneDate = '+06:00';
    const comments = await commentService.getTutorialComment1(15, zoneDate);
    expect(comments).toBe(commentsOfATutorial);
  });
});

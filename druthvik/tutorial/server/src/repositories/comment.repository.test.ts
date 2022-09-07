import * as CommentRepository from './comment.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import {
  generateCommentsData,
  generateCommentPayload,
  generateCommentData,
} from 'test/utils/generate';

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.findOne.mockClear();
  mockedGetRepo.save.mockClear();
});

describe('CommentRepository', () => {
  describe('getComments', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const comments = await CommentRepository.getComments();
      expect(comments).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toBeCalledTimes(1);
    });
  });

  test('should return comment list', async () => {
    const commentsdata = generateCommentsData(2);
    mockedGetRepo.find.mockResolvedValue(commentsdata);
    const comments = await CommentRepository.getComments();
    expect(comments).toEqual(commentsdata);
    expect(mockedGetRepo.find).toBeCalledWith();
    expect(mockedGetRepo.find).toBeCalledTimes(1);
  });
});

describe('createComment', () => {
  test('should add comment to the database', async () => {
    const payload = generateCommentPayload();
    const commentdata = generateCommentData(payload);
    mockedGetRepo.save.mockResolvedValue(commentdata);
    const comment = await CommentRepository.createComment(payload);
    expect(comment).toMatchObject(payload);
    expect(comment).toEqual(commentdata);
    expect(mockedGetRepo.save).toBeCalledWith(payload);
    expect(mockedGetRepo.save).toBeCalledTimes(1);
  });
});

describe('getComment', () => {
  test('should return comment from database', async () => {
    const id = 1;
    const CommentData = generateCommentData({ id });
    mockedGetRepo.findOne.mockResolvedValue(CommentData);
    const comment = await CommentRepository.getComment(id);
    expect(comment).toEqual(CommentData);
    expect(comment?.id).toBe(id);
    expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
    expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
  });
});

test('should return null if comment not found', async () => {
  const id = 1;
  mockedGetRepo.findOne.mockResolvedValue(null);
  const comment = await CommentRepository.getComment(id);
  expect(comment).toBeNull();
  expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
  expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
});

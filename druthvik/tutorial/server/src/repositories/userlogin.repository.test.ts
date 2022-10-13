import * as LoginRepository from './userlogin.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import {
  generateLoginPayload,
  generateLoginData,
} from '../../test/utils/generate';

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.findOne.mockClear();
  mockedGetRepo.save.mockClear();
});

describe('addUserLogin', () => {
  test('should add userLogin to the database', async () => {
    const payload = generateLoginPayload();
    const LoginData = generateLoginData(payload);
    mockedGetRepo.save.mockResolvedValue(LoginData);
    const login = await LoginRepository.createUser(payload);
    expect(login).toMatchObject(payload);
    expect(login).toEqual(LoginData);
    expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
    expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
  });
});

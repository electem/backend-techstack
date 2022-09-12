import * as loginuserRepository from './loginuser.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateloginUserData,generateloginUserPayload} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe('addLoginuser', () => {
    test('should test loginuser', async () => {
      const payload = generateloginUserPayload();
      const LoginData = generateloginUserData(payload);
      mockedGetRepo.save.mockResolvedValue(LoginData);
      const login = await loginuserRepository.createloginUser(payload);
      expect(login).toMatchObject(payload);
      expect(login).toEqual(LoginData);
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
    });
  });
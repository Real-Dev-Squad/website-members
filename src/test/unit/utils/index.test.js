import { GITHUB_MOCK_LOGIN_URL } from '@constants/AppConstants';
import { getAuthUrl, setGithubMockLoginTTL } from '../../../utils';

it('checks for auth url before and after visiting mock github auth page', () => {
  jest.spyOn(global.Storage.prototype, 'setItem');
  expect(setGithubMockLoginTTL()).toBeFalsy();
  expect(getAuthUrl()).toEqual({
    url: GITHUB_MOCK_LOGIN_URL,
    isMockUrl: true,
  });
  expect(setGithubMockLoginTTL(true)).toBeFalsy();
  expect(getAuthUrl()).not.toEqual({
    url: GITHUB_MOCK_LOGIN_URL,
    isMockUrl: true,
  });
  expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);
});

import { LOGIN_URL } from '@constants/AppConstants';
import { getAuthUrl } from '../../../utils';

// INFO: https://remarkablemark.org/blog/2021/04/14/jest-mock-window-location-href/
it('checks for auth url when window location href is undefined and not undefined', () => {
  const originURL = window.location.href;
  const getHref = jest.fn(() => originURL);
  delete window.location;
  expect(getAuthUrl()).not.toEqual(`${LOGIN_URL}&state=${originURL}`);
  window.location = {};
  Object.defineProperty(window.location, 'href', {
    get: getHref,
  });
  expect(getAuthUrl()).toEqual(`${LOGIN_URL}&state=${originURL}`);
});

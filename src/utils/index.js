import { LOGIN_URL } from '@constants/AppConstants';

export function getAuthUrl() {
  const originURL = window.location?.href;
  if (!originURL) return LOGIN_URL;
  return `${LOGIN_URL}&state=${originURL}`;
}

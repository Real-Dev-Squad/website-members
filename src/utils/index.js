import {
  LOGIN_URL,
  GITHUB_MOCK_LOGIN_URL,
  GITHUB_MOCK_LOGIN_STORAGE_KEY,
} from '@constants/AppConstants';

export function getAuthUrl() {
  const originURL = window.location.origin;
  const githubMockLogin =
    JSON.parse(localStorage.getItem(GITHUB_MOCK_LOGIN_STORAGE_KEY)) ?? {};
  const isGithubMockLoginTTLExpired = !!(
    new Date().getTime() > (githubMockLogin?.expiresIn ?? 0)
  );
  if (isGithubMockLoginTTLExpired) {
    return { url: GITHUB_MOCK_LOGIN_URL, isMockUrl: true };
  }
  if (originURL) {
    return { url: `${LOGIN_URL}&state=${originURL}`, isMockUrl: false };
  }
  return { url: LOGIN_URL, isMockUrl: false };
}

export function setGithubMockLoginTTL(isMockUrl = false) {
  if (!isMockUrl) return;
  // INFO: expiresIn logic is taken from here
  // https://github.com/Real-Dev-Squad/website-www/pull/277/commits/0e7816569562e9006bea51b37b31a70252b4d53b
  const githubMockLogin = {
    expiresIn: new Date().getTime() + 15 ** 9,
  };
  localStorage.setItem(
    GITHUB_MOCK_LOGIN_STORAGE_KEY,
    JSON.stringify(githubMockLogin)
  );
}

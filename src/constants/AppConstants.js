const BASE_IMAGE_URL =
  'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members';
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const USER_DATA_URL = `${BASE_API_URL}/users/self`;
const PATHS = {
  HOME: 'https://www.realdevsquad.com',
  WELCOME: 'https://welcome.realdevsquad.com/',
  EVENTS: 'https://www.realdevsquad.com/events.html',
  MEMBERS: 'https://members.realdevsquad.com/',
  CRYPTO: 'https://crypto.realdevsquad.com/',
  STATUS: 'https://status.realdevsquad.com/',
};
const SET_ERRORS = 'SET_ERRORS';
const SET_MEMBERS = 'SET_MEMBERS';
const HOST_NAME = 'members.realdevsquad.com';
const LOGIN_URL =
  'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97';
const USER_PROFILE_URL = 'https://my.realdevsquad.com/profile';
const NAVMENU = [
  {
    id: '1',
    name: 'Home',
    path: 'https://www.realdevsquad.com',
  },
  {
    id: '2',
    name: 'Welcome',
    path: 'https://welcome.realdevsquad.com/',
  },
  {
    id: '3',
    name: 'Events',
    path: 'https://www.realdevsquad.com/events.html',
  },
  {
    id: '4',
    name: 'Members',
    path: 'https://members.realdevsquad.com/',
  },
  {
    id: '5',
    name: 'Crypto',
    path: 'https://crypto.realdevsquad.com/',
  },
  {
    id: '6',
    name: 'Status',
    path: 'https://status.realdevsquad.com/',
  },
];
export {
  BASE_IMAGE_URL,
  BASE_API_URL,
  USER_DATA_URL,
  LOGIN_URL,
  PATHS,
  SET_ERRORS,
  SET_MEMBERS,
  HOST_NAME,
  USER_PROFILE_URL,
  NAVMENU,
};
export const BRAND_NAME = 'Real Dev Squad';
export const MEMBERS_TITLE = 'Members';
export const NEW_MEMBERS_TITLE = 'New Members';
export const SET_MEMBERS = 'SET_MEMBERS';
export const SET_ERRORS = 'SET_ERRORS';
export const HOST_NAME = 'members.realdevsquad.com';
export const TIMEOUT = 1000;
export const KEY_TAB = 9;
export const KEY_ESC = 27;

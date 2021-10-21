import { fetch } from './fetch';
import {
  getAddMemberRoleURL,
  getUserProfileSelf,
  getArchiveMemberUrl,
} from './urls';

const moveToMember = (user) =>
  fetch(getAddMemberRoleURL(user), 'patch', null, null, null, {
    withCredentials: true,
  });

const getUserSelf = () =>
  fetch(getUserProfileSelf, 'get', null, null, null, {
    withCredentials: true,
  });

const archiveMember = (user) =>
  fetch(getArchiveMemberUrl(user), 'patch', null, null, null, {
    withCredentials: true,
  });

export { archiveMember, moveToMember, getUserSelf };

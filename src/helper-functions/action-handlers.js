import { fetch } from './fetch';
import {
  getAddMemberRoleURL,
  getUserProfileSelf,
  getArchiveMemberURL,
  getTaskUpdateURL,
  getTagAssignURL,
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
  fetch(getArchiveMemberURL(user), 'patch', null, null, null, {
    withCredentials: true,
  });

const moveTask = (taskId, data) =>
  fetch(
    getTaskUpdateURL(taskId),
    'patch',
    null,
    JSON.stringify(data),
    { 'Content-Type': 'application/json' },
    {
      withCredentials: true,
    }
  );

const assignTags = (data) =>
  fetch(
    getTagAssignURL(),
    'post',
    null,
    JSON.stringify(data),
    { 'Content-type': 'application/json' },
    {
      withCredentials: true,
    }
  );

export { archiveMember, moveToMember, getUserSelf, moveTask, assignTags };

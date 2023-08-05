import { fetch } from './fetch';
import {
  getUserProfileSelf,
  getTaskUpdateURL,
  getTagAssignURL,
  updateMemberRole,
} from './urls';

const memberRoleUpdate = (user, role) =>
  fetch(updateMemberRole(user), 'patch', null, role, null, {
    withCredentials: true,
  });

const getUserSelf = () =>
  fetch(getUserProfileSelf, 'get', null, null, null, {
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

export { getUserSelf, moveTask, assignTags, memberRoleUpdate };

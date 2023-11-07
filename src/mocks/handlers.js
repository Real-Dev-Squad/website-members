import { membersHandlers } from './handlers/members';
import { usersHandlers } from './handlers/users';

export const handlers = [...membersHandlers, ...usersHandlers];

import { getUserSelf } from '@helper-functions/action-handlers';

export const UserData = {
  get: async () => {
    let userData = null;
    try {
      const response = await getUserSelf();
      if (response.status === 200) {
        userData = response.data;
      }
    } catch (err) {
      console.error(err);
    }
    return userData;
  },
};

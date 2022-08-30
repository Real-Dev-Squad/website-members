import { fetch } from '@helper-functions/fetch';
import { getActiveTasksURL } from '@helper-functions/urls';

export const UserTasksApi = {
  getAll: async (name) => {
    const tasksURL = getActiveTasksURL(name);
    let arrTasks = [];
    try {
      const response = await fetch(tasksURL);
      if (response.status === 200) {
        arrTasks = response.data?.tasks;
      }
    } catch (err) {
      console.error(err);
    }
    return arrTasks;
  },
};

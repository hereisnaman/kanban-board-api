import { requestHasura } from '../utils/';

const defaultQuery = `{
  uid
  title
  createdAt
  deadline
  priority
  archive
  user_id
  list_id
  label_id
}`;

const createTasks = (tasks, query) =>
  requestHasura({
    query: `mutation($tasks: [tasks_insert_input!]!) {
      insert_tasks(objects: $tasks) {
        returning ${query}
      }
    }`,
    variables: {
      tasks,
    },
  });

export default createTasks;

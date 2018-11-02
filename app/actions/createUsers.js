import { requestHasura } from '../utils/';

const defaultQuery = `{
  uid
  email
  name
  avatar
}`;

const createUsers = (users, query = defaultQuery) =>
  requestHasura({
    query: `mutation($users: [users_insert_input!]!) {
      insert_users(objects: $users) {
        returning ${query}
      }
    }`,
    variables: {
      users,
    },
  });

export default createUsers;

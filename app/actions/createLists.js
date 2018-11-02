import { requestHasura } from '../utils/';

const defaultQuery = `{
  uid
  title
  user_id
}`;

const createLists = (lists, query = defaultQuery) =>
  requestHasura({
    query: `mutation($lists: [lists_insert_input!]!) {
      insert_lists(objects: $lists) {
        returning ${query}
      }
    }`,
    variables: {
      lists,
    },
  });

export default createLists;

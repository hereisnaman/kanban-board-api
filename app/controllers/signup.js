import uuid from 'uuid/v1';

import { createUsers, createLists, createTasks } from '../actions/';

const signup = async (req, res) => {
  const { name, email, uid, avatar } = req.body;

  try {
    const { data: usersData, errors: createUsersErrors = [] } = await createUsers([{ uid, email, name, avatar }]);

    if (createUsersErrors.length && createUsersErrors.find(({ code }) => code === 'constraint-violation')) {
      return res.send({
        uid,
        email,
        name,
        avatar,
      });
    }

    const { data: listsData, errors: createListsErrors = [] } = await createLists(
      [
        {
          uid: uuid(),
          title: 'Todo',
          user_id: uid,
        },
        {
          uid: uuid(),
          title: 'In progress',
          user_id: uid,
        },
        {
          uid: uuid(),
          title: 'Complete',
          user_id: uid,
        },
      ],
      `{
        uid
      }`,
    );

    const { data: tasksData, errors: createTasksErrors = [] } = await createTasks(
      [
        {
          uid: uuid(),
          title: 'Sample Task',
          createdAt: new Date(),
          user_id: uid,
          list_id: listsData.insert_lists.returning[0].uid,
          priority: 0,
        },
      ],
      `{
        uid
      }`,
    );

    return res.send(usersData.insert_users.returning[0]);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default signup;

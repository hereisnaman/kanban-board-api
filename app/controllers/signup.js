import auth from '../auth';
import { requestHasura } from '../utils/';

const signup = async (req, res) => {
  const { name, email, uid, avatar } = req.body;

  try {
    const { data, errors } = await requestHasura({
      query: `mutation($user: users_insert_input!) {
        insert_users(objects: [$user]) {
          returning {
            uid
            email
            name
            avatar
          }
        }
      }
    `,
      variables: {
        user: {
          uid,
          email,
          name,
          avatar,
        },
      },
    });

    if (errors.length && errors.find(({ code }) => code === 'constraint-violation')) {
      return res.send({
        uid,
        email,
        name,
        avatar,
      });
    }

    return res.send(response.data.insert_users.returning[0]);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default signup;

import auth from '../auth';
import { requestHasura } from '../utils/';

const me = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { data } = await requestHasura({
      query: `query($uid: String!) {
        users_by_pk(uid: $uid) {
          uid
          email
          name
          avatar
        }
      }
    `,
      variables: {
        uid: uid,
      },
    });

    if (!data.users_by_pk) {
      auth.deleteUser(uid);

      return res.sendStatus(404);
    }

    return res.send(data.users_by_pk);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default me;

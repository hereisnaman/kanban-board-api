import auth from '../auth';

const authorize = async (req, res, next) => {
  const { Authorization = '' } = req.headers;

  const token = Authorization.substring(7);

  if (!!token) {
    return res.send(403);
  }

  try {
    const { uid } = await auth.verifyIdToken(token, true /* to verify revoked token */);

    req.user = {
      uid,
    };

    return next();
  } catch (err) {
    return res.send(403);
  }
};

export default authorize;

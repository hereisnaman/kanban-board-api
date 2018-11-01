import auth from '../auth';

const authorize = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const token = authorization.substring(7);

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const { uid } = await auth.verifyIdToken(token, true /* to verify revoked token */);

    req.user = {
      uid,
    };

    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default authorize;

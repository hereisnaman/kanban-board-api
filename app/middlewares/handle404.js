const handle404 = (req, res, next) => {
  res.status(404);
  res.send('Not found');
};

export default handle404;

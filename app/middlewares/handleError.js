const handleError = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send('Internal server error');
};

export default handleError;

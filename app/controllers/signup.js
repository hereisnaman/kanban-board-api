const signup = (req, res) => {
  const { name, email, uid } = req.body;
  console.log(name, email);
};

export default signup;

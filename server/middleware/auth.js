// TODO: CONFIGURE AS MIDDLEWARE

module.exports = (req, res, next) => {
  // console.log(req.session.user);
  // console.log(req.headers);
  next();
};

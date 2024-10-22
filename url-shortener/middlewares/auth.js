const {getUser} = require("../services/auth")

const restrictToLoggedInUserOnly = async (req, res, next) => {
  const userUid = req.cookies?.uid;

  if(!userUid) return res.redirect("/login");

  const user = getUser(userUid);

  if(!user) return res.redirect("/login");

  req.user = user;
  next();

}

const checkAuthorization = (req, res, next) => {
  const userUid = req.cookies?.uid;
  
  if(!userUid) return res.redirect("/login");

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuthorization
}
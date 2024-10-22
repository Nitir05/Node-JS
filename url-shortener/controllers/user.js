const AuthUser = require("../models/user");
const {v4: uuid} = require("uuid");
const {setUser} = require("../services/auth");

const handleUserSignUp = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    AuthUser.create({
      name,
      email, password
    });

    res.render("home")
  } catch (error) {
    
  }
}

const handleUserLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await AuthUser.findOne({
      email, password
    });

    if(!user) return res.render("login", {
      error: "Invalid username or password"
    })

    const token = setUser(user);
    res.cookie("uid", token)
    return res.redirect("/");

  } catch (error) {
    
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin
}
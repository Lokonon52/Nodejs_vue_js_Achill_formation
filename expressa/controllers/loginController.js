const loginService = require("../services/loginService");
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error = [];
    if (!password || password.trim() === "") {
      error.push("password is not empty");
    }
    if (!email || email.trim() === "") {
      error.push("email is not empty");
    }
    if (error.length == 0) {
      const user = await loginService.userLogin({ email, password });
      res.json(user);
    } else {
      res.status(400).json({ error });
    }
  } catch (error) {    
    next(error);
  }
};

module.exports = {
  login,
};

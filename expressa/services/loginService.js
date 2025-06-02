require('dotenv').config();
const bcrypt = require("bcryptjs");
const Users = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const userLogin = async (data) => {
  try {
    const { email, password } = data;
    const user = await Users.findOne({ where: { email } });
    if (!user) return { success:false, message: "User not found" };
    const macthPassword =await bcrypt.compare(password, user.password);
    if (!macthPassword) {
      return {
        success: false,
        message: "identifiant ou mot de passe incorrect",
      };
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { success: true, message:`${user.username} is conneting`,token, expiresIn: "1h" };
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = {
  userLogin,
};


require('dotenv').config();
const jwt = require("jsonwebtoken");
const authVerify = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        message: "Veuillez vous connecter accès invalide",
      });
    }

    const token = authHeader.split(" ")[1]; // Extraction du token après 'Bearer'
    if (!token) {
      return res.status(401).json({ message: "Token non fourni" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajout du token décodé à la requête
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authVerify;

const controllers=require('../controllers/resetPassword')
const express = require("express");
const router = express.Router();
// Route pour demander la réinitialisation
router.post("/request",controllers.requestResetPassword)
// Route pour réinitialiser le mot de passe
router.post("/reset",controllers.resetPassword);
module.exports=router
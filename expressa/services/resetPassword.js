const bcrypt=require('bcryptjs')
require('dotenv').config();
const Users = require("../models/usersModel");
const crypto = require("crypto");//Génère un code 
const nodemailer = require("nodemailer");//Envoie un mail
//___________________________________________________
const generateResetCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Génère un code de 6 caractères
}
//___________________________________________________
//Configuration et Envoi de l'Email

const sendResetEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',   //Simple Mail Transfer Protocol 
      port: 587,
      secure: false, // Utilisez true pour le port 465
      auth: {
        user:process.env.MON_EMAIL, 
        pass: process.env.MON_PASS // Assurez-vous de sécuriser ce mot de passe
      },
    })
    const mailOptions = {
      from: process.env.MON_EMAIL,
      to: email,
      subject: "Code de Réinitialisation de Mot de Passe du site BilokMarKet",
      text: `Votre code de réinitialisation est : ${code}`,
    };

   const send= await transporter.sendMail(mailOptions);
    console.log("Email envoyéh!");
    return send;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};
//____________ Sauvegarder le Code et l'Email dans la Base de Données___________________________________________________

const saveResetCode = async (email, code) => {
    try {
     const save= await Users.update(
        { resetCode: code, resetCodeExpires: Date.now() + 3600000 }, // 1 heure de validité
        { where: { email } }
      );
  return save;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du code:", error);
    }
  };
  //____________________________________________________________________
const resetPassword = async (email, code, newPassword) => {
    try {
      const user = await Users.findOne({ where: { email, resetCode: code } });
  
      if (!user) {
        return { status: "error", message: "Code invalide ou utilisateur non trouvé." };
      }
  
      // Vérifier si le code a expiré
      if (user.resetCodeExpires < Date.now()) {
        return { status: "error", message: "Code expiré." };
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe
      await Users.update(
        { password: hashedPassword, resetCode: null, resetCodeExpires: null },
        { where: { email } }
      );
  
      return { status: "success", message: "Mot de passe réinitialisé avec succès!" };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  };
  //___________________________________________________
  module.exports= {generateResetCode, sendResetEmail,saveResetCode,resetPassword }
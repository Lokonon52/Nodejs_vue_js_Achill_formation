
const crypto = require("crypto");//Génère un code 
const nodemailer = require("nodemailer");//Envoie un mail
const generateResetCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Génère un code de 6 caractères
}
//Configuration et Envoi de l'Email
const  code =generateResetCode()
const sendResetEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "votre.email@gmail.com",
        pass: "votre_mot_de_passe", // Assurez-vous de sécuriser ce mot de passe
      },
    });

    const mailOptions = {
      from: '"Support" <votre.email@gmail.com>',
      to: email,
      subject: "Code de Réinitialisation de Mot de Passe",
      text: `Votre code de réinitialisation est : ${code}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email envoyé!");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};
//____________ Sauvegarder le Code et l'Email dans la Base de Données___________________________________________________

const saveResetCode = async (email, code) => {
    try {
      await Users.update(
        { resetCode: code, resetCodeExpires: Date.now() + 3600000 }, // 1 heure de validité
        { where: { email } }
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du code:", error);
    }
  };
  
module.exports ={generateResetCode, sendResetEmail,saveResetCode };

const services = require('../services/resetPassword')
// Route pour demander la réinitialisation
const requestResetPassword = async (req, res) => {

  const { email } = req.body;

  const code = services.generateResetCode();
  try {
    //save  the code in datase if email existe
   const save= await services.saveResetCode(email, code);
      
     console.log(save[0]);
     if (save[0]) {
      await services.sendResetEmail(email, code);
      res.json({ status: true, message: " Code envoyé avec success " ,code:code});
     }else{res.json({ status: false, message: "Email not found " })}
    
  }catch (error) {
  next(error);
} 
  }
// Route pour réinitialiser le mot de passe
const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const result = await services.resetPassword(email, code, newPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }

};

module.exports = { requestResetPassword, resetPassword };

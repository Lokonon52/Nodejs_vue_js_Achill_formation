const userService = require("../services/userService");
// Récupère un utilisateur
const getUserConnect = async (req, res, next) => {
  try {
    const user = await userService.getUserConnect(req.user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
//creer un utilisateurs
const createUsers = async (req, res, next) => {
  try {
    const { username, email, age, password } = req.body;
    const error = [];
    if (!username || username.trim() === "") {
      error.push("username is not empty");
    }
    if (!email || email.trim() === "") {
      error.push("email is not empty");
    }
    if (error.length == 0) {
      const user = await userService.createUsers({
        username,
        email,
        age,
        password,
      });
      res.json(user);
    } else {
      res.status(400).json({ error });
    }
  } catch (error) {
    next(error);
  }
};
// CONTROLLER pour récupérer un utilisateur par son ID
const getUserById= async (req, res) => {
  const { id } = req.params; // Récupère l'ID depuis les paramètres de la requête

  try {
    const user = await userService.getUserById(id); // Appelle le service pour obtenir l'utilisateur
    if (user.message) {
      // Si un message est retourné (utilisateur non trouvé ou autre)
      return res.status(404).json({ message: user.message });
    }
    return res.status(200).json(user); // Retourne l'utilisateur trouvé
  } catch (error) {
    // Gère les erreurs en renvoyant un statut 500 avec le message d'erreur
    return res.status(500).json({ message: error.message });
  }
};
// Nouveau contrôleur pour obtenir tous les utilisateurs
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
 } catch (error) {
    next(error);
  }
};
// Controller pour supprimer un utilisateur par son ID
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUser(id);
    if (result.message === "User not found or already deleted.") {
      return res.status(404).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};
// CONTROLLER pour mettre à jour un utilisateur par son ID
const updateUsers = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, age, password } = req.body;

  try {
    const result = await userService.updateUsers(id, { username, email, age, password });

    if (result.status === "error") {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUserConnect,
  createUsers,
  getUserById,
  getAllUsers ,
  deleteUser, 
  updateUsers,
};

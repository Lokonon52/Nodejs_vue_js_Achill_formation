
const bcrypt = require("bcryptjs");
const Users = require("../models/usersModel");
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1', // Utilisez l'adresse IP du conteneur Redis ici
  port: 6379,
});

// SERVICE pour recuperer  l' utilisateur active
const getUserConnect = async (payload) => {
  try {
    const user = await Users.findOne({ where: { id: payload.userId } });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
//  SERVICE pour créer tous les utilisateurs
const createUsers = async (data) => {
  const { username, email, age, password } = data;

  const user = await Users.findOne({ where: { email } });
  
  if (user) return { message: "User has been existe!", success: false };
  const hashPassword = await bcrypt.hash(password, 4);
  try {
    const newUser = await Users.create({
      username,
      email,
      age,
      password: hashPassword,
      resetCode: null,
      resetCodeExpires: null,
    });

    delete newUser.toJSON().password;
    const cached = await redis.get('users');
    if (cached) {
      const users = JSON.parse(cached);
      users.push(newUser);
      await redis.set('users', JSON.stringify(users));
      console.log('Utilisateurs mis en cache:', users); // Ajoutez ce log
    } else {
      // Si le cache était vide, on initialise un nouveau tableau
      const users = [newUser];
      await redis.set('users', JSON.stringify(users));
      console.log('Utilisateurs créés et mis en cache:', users); // Ajoutez ce log
    }
    
    return { message: `User:${newUser.username} was succesfully created!`, user: newUser, success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};
//  SERVICE pour récupère tous les utilisateurs
const getAllUsers = async () => {
  try {
    const cached = await redis.get('users');
    if (cached) {
      console.log('cached');

      return JSON.parse(cached);//convertis en objet
    } else {
      const users = await Users.findAll(); // Récupère tous les utilisateurs
      await redis.set('users', JSON.stringify(users), 'EX', 3600); // JSON.stringify(users) convertis en string
      console.log("No cached");

      return users;
    }

  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};
// SERVICE pour récupérer un utilisateur par son ID
const getUserById = async (id) => {
  try {
    const user = await Users.findByPk(id); // Récupère l'utilisateur par sa clé primaire
    if (!user) {
      return { status: "error", message: "User not found!" }; // Retourne un message si l'utilisateur n'est pas trouvé
    }
    return { status: "success", user: user }; // Retourne l'utilisateur trouvé avec un statut de réussite
  } catch (error) {
    return { status: "error", message: error.message }; // Retourne l'erreur dans un format cohérent
  }
};
// SERVICE pour supprimer un utilisateur par son ID
const deleteUser = async (id) => {
  try {
    const result = await Users.destroy({ where: { id } });
    if (result === 0) {
      return { message: "User not found or already deleted.", success: false };
    }
    return { message: "User successfully deleted.", success: true };
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};

// SERVICE pour mettre à jour un utilisateur par son ID
const updateUsers = async (id, data) => {
  try {
    const { username, email, age, password } = data;

    // Vérifier si l'utilisateur existe
    const user = await Users.findByPk(id);
    if (!user) {
      return { status: "error", message: "User not found!" };
    }

    // Hacher le nouveau mot de passe si fourni
    let hashPassword = user.password;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }

    // Mise à jour des informations de l'utilisateur
    await Users.update(
      {
        username: username || user.username,
        email: email || user.email,
        age: age || user.age,
        password: hashPassword,
        resetCode: null,
        resetCodeExpires: null,
      },
      { where: { id } }
    );

    // Récupérer l'utilisateur mis à jour
    const updatedUser = await Users.findByPk(id);
    const userWithoutPassword = updatedUser.toJSON();
    delete userWithoutPassword.password;

    return {
      status: true,
      message: "User updated successfully!",
      data: userWithoutPassword
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
module.exports = {
  getUserConnect,
  getUserById,
  createUsers,
  getAllUsers,
  deleteUser,
  updateUsers,
};

const { Sequelize } = require("sequelize");
require('dotenv').config();
// Utilisation des variables d'environnement pour les informations sensibles
const sequelize = new Sequelize(process.env.DB_NAME,
   process.env.DB_USER, 
   process.env.DB_PASSWORD, 
   {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  dialectOptions: { timezone: "Etc/GMT+2" },
});

// Synchroniser les modèles avec la base de données
sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée avec succès !");
  })
  .catch((err) => {
    console.error("Erreur lors de la synchronisation de la base de données :", err.message);
  });

module.exports = sequelize;

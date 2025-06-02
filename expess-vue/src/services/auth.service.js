import Axios from "./caller.sevice";
import Cookies from "cookies-js";
const signIn = (credential) => {
  return Axios.post("/auth/login",credential);
};

const signUp = (credential)     => {
   return Axios.post("/users/create", credential);
};


// Nouvelle méthode pour la déconnexion
const logout = async () => {
  try {
    // Suppression du jeton des cookies
    Cookies.expire('token');

    // Optionnel : appel à une API pour informer le serveur
    await Axios.post('/auth/logout');

    // Rediriger ou effectuer d'autres actions post-déconnexion
    // Exemple: redirection vers la page de connexion
    window.location.href = '/';
  } catch (error) {
    console.log('Erreur lors de la déconnexion', error);
  }
};

export const authService = { signIn, signUp,logout  };
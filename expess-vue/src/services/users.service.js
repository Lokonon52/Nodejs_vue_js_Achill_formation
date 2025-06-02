import Axios from "./caller.sevice";
//bibliothèque cookies-js, qui permet de manipuler les cookies côté client 
//(par exemple, pour enregistrer, lire ou supprimer des cookies).
import Cookies from "cookies-js";

const me = () => {
  //récupérer les informations de l'utilisateur connecté.
  return Axios.get("/users/me");
};
const getAllUsers = () => {
  //récupérer les informations de tous utilisateurs.
  return Axios.get("/users/list/all");
};
const getUserById = (id) => {
  return Axios.get(`/users/${id}`);
};

//--------------------------------------------
const deleteUsers = (id) => {
  // Supprimer un utilisateur en fonction de son ID
  return Axios.delete(`/users/${id}`);
};

const updateUsers = (id, updatedData) => {
  // Mettre à jour un utilisateur en fonction de son ID avec les données mises à jour
  return Axios.put(`/users/${id}`, updatedData);
};
//
const saveToken = (token) => {
  Cookies.set("token", token, { expires: 1, secure: true, path: '/' });
 /* créer ou mettre à jour un cookie nommé token avec la valeur du jeton passé en paramètre. 
 Ce jeton est généralement utilisé pour l'authentification lors de futures requêtes.*/
  Cookies.set("token", token);
};

const isLogged = () => {
  //Cookies.get("token") : Cette ligne récupère le jeton stocké dans le cookie nommé token.
  const token  = Cookies.get("token");
  /*return !!token : Cette expression retourne true si un jeton est présent 
  (donc si l'utilisateur est connecté) ou false s'il n'y a pas de jeton.*/
  return !!token;
};

const getToken = () => {
/*  Cookies.get("token") : Cette ligne renvoie le jeton s'il est présent dans le cookie,
   ce qui permet de l'utiliser, par exemple, pour autoriser des requêtes.*/
  return Cookies.get("token");
};
//___________________________________________

export const userService = { me,getUserById,getAllUsers,deleteUsers,updateUsers,saveToken, isLogged, getToken };
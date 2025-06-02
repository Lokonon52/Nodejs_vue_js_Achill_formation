import axios from "axios";
import { userService } from "@/services/users.service";
// Créez une instance Axios avec une configuration de base
const Axios = axios.create({
  baseURL: "http://localhost:3000", // Remplacez par l'URL de votre API
});

// Ajout du jeton d'authentification aux requêtes si l'utilisateur est connecté
Axios.interceptors.request.use((request) => {
  const token = userService.getToken();
  if (userService.isLogged() && token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, Promise.reject);

// Gérer les erreurs de réponse globales
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, request, message } = error;

    if (response) {
      console.error("Erreur serveur:", response.data);
    } else if (request) {
      console.error("Aucune réponse du serveur :", request);
    } else {
      console.error("Erreur requête:", message);
    }

    return Promise.reject(error);
  }
);

export default Axios;

import { defineStore } from "pinia";
import { ref } from "vue";
//Service utilisateur importé,fonctions liées à l'authentification et à la gestion des utilisateurs.
import { userService } from "@/services/users.service";
//ce bloc ligne définit un nouveau store Pinia avec le nom "user"
export const userStore = defineStore("user", () => {
  const user = ref({}); //un objet reactive declaré

   //const allusers = ref([]);
//récupérer les données de l'utilisateur à partir du service utilisateur.
  const fetchUser = async () => {
    try {
    
      //Cette ligne attend la réponse de la fonction me du service utilisateur, qui probablement
       //fait une requête à une API pour obtenir les informations de l'utilisateur connecté.
      const res = await userService.me();
    //Si la requête réussit, les données de l'utilisateur sont stockées dans user.value, 
    //qui mettra automatiquement à jour tout composant Vue.js qui utilise cette référence.
      user.value = res.data;
    console.log(user.value);

    } catch (error) {
      // Si la requête échoue, l'erreur est capturée et un message est affiché dans la console.
      console.error("Failed to fetch user data", error);
    }
  };
 // La fonction defineStore retourne un objet contenant la propriété user et la méthode fetchUser, 
 // ce qui rend ces éléments accessibles dans d'autres parties de l'application.
  return { user, fetchUser };
});

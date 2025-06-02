<template>
    <div class="container">
      <h5>{{ userId }}</h5>
      <!-----------------FORM---------------------------------->
      <form @submit.prevent="updateUser">
        <div>
          <input type="text" v-model="username" placeholder="username">
        </div>
        <div>
          <input type="email" v-model="email" placeholder="email">
        </div>
        <div>
          <input type="text" v-model="age" placeholder="age">
        </div>
    
        <div>
          <button type="submit">{{ loading ? 'modification en cours...' : 'Modifier' }}</button>
          <p v-if="!loading && message && message.trim() != ''">{{ message }}</p>
        </div>
      </form>
      <!-----------------FORM---------------------------------->
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { userService } from "../services/users.service";
  import { ref, onMounted } from 'vue';
  
  const loading = ref(false);
  const username = ref('');
  const email = ref('');
  const age = ref('');
  const password = ref('');
  const message = ref('');
  const route = useRoute();// pour accéder aux paramètres de la route
  const router = useRouter(); // Utilisez useRouter pour la redirection
  
  // Récupérer l'ID de l'utilisateur depuis les paramètres de la route
  const userId = route.params.id || route.query.id;
  console.log('User ID:', userId);
  
  // Fonction pour pré-remplir le formulaire avec les données de l'utilisateur
  const fetchUserData = async () => {
    try {
      loading.value = true;
      const response = await userService.getUserById(userId); // Supposons que cette méthode prenne un ID en paramètre
      const userData = response.data.user;
      console.log(userData);
      
      // Remplir les champs du formulaire avec les données récupérées
      username.value = userData.username;
      email.value = userData.email;
      age.value = userData.age;
      password.value = ''; // Le mot de passe n'est généralement pas pré-rempli pour des raisons de sécurité
    } catch (error) {
      console.log('Error fetching user data:', error);
    } finally {
      loading.value = false;
    }
  }
  onMounted(() => {
    fetchUserData();
  });
  
  // Fonction pour mettre à jour l'utilisateur
  const updateUser = async () => {
    try {
      loading.value = true;
  
      // Préparer les données à envoyer
      const data = {
        username: username.value,
        email: email.value,
        age: age.value,
        password: password.value 
      };
      console.log(data);
  
      const response = await userService.updateUsers(userId, data);
      console.log(response);
      message.value = response.data.message;
      if (response.data.status) {
        // Rediriger vers la page /users avec le message après une mise à jour réussie
      router.push({ name: 'users', query: { message: message.value } });

      }
      
    } catch (error) {
      console.log('Error updating user:', error);
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  
  <style scoped>
  form {
    border: 3px dashed rgb(106, 47, 161);
    border-radius: 14px;
    width: 400px;
    margin-left: 400px;
    margin-top: 30px;
    background: linear-gradient(45deg, #959292, #ff7e5f, #5aa549);
  }
  
  input {
    width: 300px;
    height: 50px;
    border: 3px solid rgb(1, 0, 3);
    border-radius: 14px;
    margin: 10px;
  }
  
  button {
    border: 3px solid rgb(1, 0, 3);
    border-radius: 14px;
    margin: 10px;
    padding: 10px;
    width: 100px;
  }
  
  button:hover {
    border: 3px solid rgb(1, 0, 3);
    border-radius: 14px;
    margin: 10px;
    padding: 12px;
    background-color: bisque;
  }
  
  p {
    color: snow;
  }
  </style>
  
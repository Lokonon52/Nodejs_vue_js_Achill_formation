<template>
<div class="container">
  <!-----------------FORM---------------------------------->
  <form @submit.prevent="createUser">
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

      <input type="passwword" v-model="password"  placeholder="Password">
    </div>
    <div>
      <button type="submit">{{ loading ? ' creation en cours...' : 'Create' }}</button>
      <p v-if="!loading && message && message.trim() != ''">{{ message }}</p>
    </div>
  </form>

  <!-----------------FORM---------------------------------->
</div>
</template>

<script setup>

import { authService } from '@/services/auth.service';
import {useRouter }from 'vue-router';
import { ref } from 'vue';
const router=useRouter();
const loading = ref(false);
const username = ref('');
const email = ref('');
const age = ref('');
const password = ref('');
const message = ref('');

const createUser = async () => {
  try {
    loading.value = true;
    //Après vérification des données

    const data = { username: username.value, email: email.value, age: age.value, password: password.value }
    console.log(data);
    const response = await authService.signUp(data);

    console.log(response);
    message.value = response.data.message;
    if ( response.data.success) {
      router.push({name:'users',query:{ message:response.data.message } });
    }
   
  } catch (error) {
    console.log(error.message);
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
p{color: snow;}
</style>
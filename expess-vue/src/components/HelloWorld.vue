<template>
  <h3>{{msg}}</h3>
<!-----------------FORM---------------------------------->
  <form @submit.prevent="handlerLogin">
    <div>
    
      <input type="email" v-model="email" placeholder="email">
    </div>
    <div>
      <input type="password" v-model="password"  placeholder="password">
    </div>
    <div>
      <button type="submit">{{ loading ? 'Connexion en cours...' : 'Connexion' }}</button>
      <br>
      <span class="resetPass" @click="resetPass">Mot de passe oublier</span>
      <p v-if="!loading && message && message.trim() != ''">{{ message }}</p>
    </div>
  </form>
  <!-----------------FORM---------------------------------->
</template>

<script setup>
import { authService } from '@/services/auth.service';
import { ref } from 'vue';
import { userService } from "@/services/users.service";
import { useRouter,useRoute } from 'vue-router';

const loading = ref(false);
const email = ref('');
const password = ref('');
const message = ref('');
const msg=ref('');
const router = useRouter();
const route=useRoute()
msg.value=route.query.message;
const handlerLogin = async () => {
  try {
    loading.value = true;
    const data = { email: email.value, password: password.value }
    const response = await authService.signIn(data);
    console.log(response);
    userService.saveToken(response.data?.token);
    message.value = response.data.message;
    if (response.data.success) {
      router.push('/users')
    }
  
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
}

const resetPass = () => {
  
  router.push({name:'emailinput',query:{ message:"Veuillez Envoyer votre email"} });
}
</script>
<style scoped>

form{ 
  border: 3px dashed rgb(106, 47, 161);
  border-radius: 14px;
width: 400px;
margin-left: 400px;
background: linear-gradient(45deg, #959292 , #ff7e5f, #5aa549);

}

input{
  width: 300px;
  height: 50px;
  border: 3px solid rgb(1, 0, 3);
  border-radius: 14px;
  margin: 10px;
}
button{ 
  border: 3px solid rgb(1, 0, 3);
  border-radius: 14px;
  margin: 10px;
padding: 10px;
 }
 button:hover{ 
  border: 3px solid rgb(1, 0, 3);
  border-radius: 14px;
  margin: 10px;
 padding: 12px;
 background-color: bisque;

 }
 
 .resetPass{ 
color: white;
cursor: pointer;
font-size: 20px;
 }
 h3{color: #5aa549;}
</style>

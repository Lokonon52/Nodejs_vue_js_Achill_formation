<template>
  <h3 v-if="msg">{{msg}}</h3>
  <h4>Veuillez consulter votre email pour envoyer le code</h4>
  
    <!-----------------FORM---------------------------------->
      <form @submit.prevent="handlerCode">
        <div>
          <input type="text" v-model="code" placeholder="Code">
        </div>
            <button type="submit">{{ loading ? 'vérification en cours...' : 'Vérifier' }}</button>
            <br>
            <a  v-if="!message"> Code non réçu</a>
            <h5> {{message}}</h5>
      </form>
      <!-----------------FORM---------------------------------->
</template>
<script setup>

import {useRouter,useRoute} from 'vue-router';
import {ref} from 'vue';
const router=useRouter();
const code=ref('')
const loading=ref(false);
const message=ref('');
const msg=ref('');
const route=useRoute();
msg.value=route.query.message + 'à' + route.query.email 
const handlerCode =()=>{
  loading.value=true;
  if (code.value.trim()==route.query.code) {
    router.push({name:'newpassword',query:{ message:'Le code verifié avec succes ',code:code.value,email:route.query.email} })
  }else{loading.value=false ,message.value ="Code incorrect"}
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
h3{color: #5aa549;}
</style>
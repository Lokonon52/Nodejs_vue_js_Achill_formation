<template>
  
    <!-----------------FORM---------------------------------->
    <h3>{{msg}}</h3>
      <form @submit.prevent="handlerNewPassword">
        <h6>Envoyer un nouveau mot de passe</h6>
        <div>
        
          <input type="text" v-model="newPassword" placeholder="New password">
        </div>
        
            <button type="submit">{{ loading ? 'Connexion en cours...' : 'Connexion' }}</button>
            <br>
            <h6>{{message}}</h6>
      </form>
      <!-----------------FORM---------------------------------->
    </template>

  <script setup>
  import  {forgetPassword}from '@/services/forget.password';
  import {useRouter,useRoute} from 'vue-router';
  import {ref} from 'vue';
  
  const loading=ref(false);
  const newPassword=ref('');
  const message=ref('');
  const msg=ref('');
  const router=useRouter();
  const route=useRoute();
  msg.value=route.query.message;
  const handlerNewPassword=async()=>{
    loading.value=true;
    
    const data={email:route.query.email,code:route.query.code,newPassword:newPassword.value.trim()}
    const response=await forgetPassword.resetPassword(data);
    
    message.value =response.data.message ;
    console.log(response);
    if (response.data.status) {
      router.push({name:'home',query:{message:response.data.message } })
    }else{loading.value=false}
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
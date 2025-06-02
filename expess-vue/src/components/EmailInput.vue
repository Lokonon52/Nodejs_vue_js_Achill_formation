<template>
  
    <!-----------------FORM---------------------------------->
      <form @submit.prevent="handlerEmail">
        <div>
        
          <input type="email" v-model="email" placeholder="email">
        </div>
        
            <button type="submit">{{ loading ? 'Connexion en cours...' : 'Connexion' }}</button>
            <br>
            {{ message }}
      </form>
      <!-----------------FORM---------------------------------->
    </template>
    <script setup>
    import  {forgetPassword  }from '@/services/forget.password';
    import {useRouter} from 'vue-router';
    import {ref} from 'vue';
    const email=ref('')
    const loading=ref(false);
    const message=ref('');
    const router=useRouter();
    const handlerEmail =async()=>{
      loading.value=true;
      const data={email:email.value}
      const response=await forgetPassword.resquestResetPassword(data);
      
      message.value =response.data.message ;
      console.log(response);
      if (response.data.status) {
        router.push({name:'codesend',query:{message:response.data.message ,email:email.value,code:response.data.code} })
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
</style>
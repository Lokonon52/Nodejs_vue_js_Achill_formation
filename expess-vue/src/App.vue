
<template>
  <nav >
    <router-link class="link" to="/">Login</router-link>
    <router-link class="link" to="/about">Create New User</router-link>
    <router-link class="link" to="/users">Users</router-link>
    <router-link class="link" to="/private">Logout</router-link>
  </nav>
  <router-view />
</template>

<script>




export default {
  setup() {
     }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  border: 1px solid black;
  background: #45aac9;

  a {
    font-weight: bold;
    color: snow;
    text-decoration: none;
    &.router-link-exact-active {
      color: #070707;
    }
  }
}

.link {
  padding: 15px;
  border: 1px solid #dfdbdb;
  margin-right: 100px;
  border-radius: 16px;
  list-style: none;
  text-decoration: none;
}
</style>

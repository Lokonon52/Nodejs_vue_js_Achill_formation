<template>
<div>
    <CreateUsers/>
  </div>
</template>
<script>
// @ is an alias to /src
import CreateUsers from '@/components/CreateUsers.vue';
export default {
  name: 'aboutView',
  components: {
    CreateUsers
  }
}
</script>

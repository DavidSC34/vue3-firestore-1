<template>
  <div v-if="isAuthenticated">
      <h1>Perfil</h1>
      <pre>
        {{user}}
      </pre>

  </div>
</template>

<script>
import {useAuth} from '@vueuse/firebase'
export default {
    setup(){
       const {user, isAuthenticated} = useAuth();

       return{user, isAuthenticated}
    },
}
</script>

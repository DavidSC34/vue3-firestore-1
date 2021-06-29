<template>

    <div v-if="isAuthenticated">
      
        <h1>CRUD</h1>
        <Cargando v-if="cargando"/>
        <div v-else>
          <Error v-if="pintarError"/>
          <TodoForm/>
          <Todo v-for="todo in todos" :key="todo.id"  :todo="todo"/>
        </div>
    </div>
</template>

<script>
import { useAuth } from '@vueuse/firebase';
import {useDb} from '../composables/useDb'
import Cargando from '../components/Cargando.vue'
import Error from '../components/Error.vue'
import TodoForm from '../components/TodoForm.vue';
import Todo from '../components/Todo.vue';
import { computed,onMounted,provide,ref } from 'vue';

export default {
  components:{Cargando,Error,TodoForm,Todo},
     setup(){
       const {isAuthenticated} = useAuth();
       const {getTodos, cargando} = useDb();
       //Refs 
       const todos = ref([]);
       const error = ref(null);

       provide('error',error);
       provide('todos',todos);
       
       const pintarError = computed(()=>error.value ? true :false)

       onMounted(async ()=>{
          //cargando.value = true;
          todos.value = await getTodos();
          if(todos.value.res){
            console.log(todos.value.error);
            error.value = todos.value.error
          }
          //cargando.value = false;
       })

       return {isAuthenticated,todos,cargando,pintarError};
     }
}
</script>

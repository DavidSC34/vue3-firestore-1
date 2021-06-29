<template>
    <form @submit.prevent="procesarFormulario">
        <input 
            type="text" 
            placeholder="Enter para agregar todo"
            class="form-control my-3"
            v-model.trim="texto"
            >
    </form>
</template>

<script>
import {inject, ref} from 'vue'
import {useDb} from '../composables/useDb'
export default {
    setup() {

        const  {agregarTodo} = useDb();
        const texto = ref('');
        const todos = inject('todos');
        const error = inject('error');
        
        const procesarFormulario = async()=>{
            if(!texto.value.trim()){
                console.log('Texto vacio');
                return;
            }

            const todo = await agregarTodo(texto.value);
            if(todo.res){
                error.value = todo.error;
                texto.value='';
                return;
            }
            todos.value = [...todos.value,todo];//-->lo que tengas todos y agregamos el nuevo
            texto.value='';
        }
        
        return{texto,procesarFormulario}
        
    },
}
</script>
<template>
    <div class="card shadow-sm mb-2">
        <div class="card-body">
            <p
              class="m-0"
              :class="{'text-decoration-line-through':todo.estado}"
            >
                {{todo.texto}}
            </p>
            <div class="mt-2">
                <button
                    class="btn me-1" 
                    @click="modificar(todo)"
                    :class="todo.estado ? 'btn-success':'btn-warning'"
                    :disabled="bloquear"
                >
                    {{todo.estado ? 'Finalizar' : 'Pendiente'}}
                </button>
                <button
                    class="btn btn-danger"
                    @click="eliminar(todo.id)"
                    :disabled="bloquear"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {inject,ref} from 'vue'
import {useDb} from '../composables/useDb'
export default {
    props:{todo:Object},
    setup() {
        
        const {eliminarTodo,modificarTodo} = useDb();
        const error = inject('error');
        const todos = inject('todos');
        const bloquear = ref(false);

        const modificar = async(todo)=>{
               bloquear.value =true;
               const respuesta = await modificarTodo(todo);
               
               if(respuesta.res){
                   error.value = respuesta.error;
                    bloquear.value =false;
                   return;
               }

               todos.value = todos.value.map( item =>(
                   item.id === todo.id ? {...item,estado:!todo.estado} :item
               ))

                bloquear.value =false;
        }

        const eliminar = async(id)=>{
            bloquear.value = true;
            const respuesta = await eliminarTodo(id);

            if(respuesta.res){
                error.value = respuesta.error
                bloquear.value = false;
                return;
            }

            todos.value = todos.value.filter( item => item.id !== id);
            bloquear.value = false;

        }

        return {eliminar,modificar}

    },
}
</script>
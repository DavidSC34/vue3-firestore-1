import { db, marcaTiempo } from "../firebase";
import { ref } from "vue";
import { useAuth } from "@vueuse/firebase";

export const useDb = () => {

    const referencia = db.collection('todos');
    const cargando = ref(false);
    const { user } = useAuth();

    //Obtener todos los documentos
    const getTodos = async() => {
            try {
                cargando.value = true;
                const res = await referencia.get();
                return res.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            } catch (error) {
                return {
                    error,
                    res: true
                }
            } finally {
                cargando.value = false;
            }
        }
        //Agregar documentos o todos
    const agregarTodo = async(texto) => {
        try {
            const todo = {
                texto: texto,
                fecha: marcaTiempo(),
                estado: false,
                uid: user.value.uid
            }

            const res = await referencia.add(todo);

            return {
                id: res.id,
                ...todo
            }
        } catch (error) {
            return {
                error,
                res: true
            }
        }
    }

    return { getTodos, cargando, agregarTodo }
}
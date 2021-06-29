<template>
    <div class="card shadow-sm mb-2">
        <div class="card-body">
            <p
              class="m-0"
            >
                {{todo.texto}}
            </p>
            <div class="mt-2">
                <button
                    class="btn btn-warning me-1" 
                >
                    Finalizar
                </button>
                <button
                    class="btn btn-danger" 
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{todo:Object},
    setup() {
        
    },
}
</script>
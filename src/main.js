import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

//A los scripts para efectos de otros modos
// import 'bootstrap'

createApp(App).use(router).mount('#app')
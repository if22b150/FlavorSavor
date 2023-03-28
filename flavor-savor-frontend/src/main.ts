import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";

//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)

app.mount('#app')

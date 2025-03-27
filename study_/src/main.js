import './main.css'
import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp()
app.use(router)
app.mount('#app')
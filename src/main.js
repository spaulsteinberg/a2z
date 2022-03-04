import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import 'element-plus/dist/index.css'

import store from './store/index';
import { auth } from './firebase/config'

const unsubscribe = auth.onAuthStateChanged(user => {
    createApp(App).use(router).use(store).mount('#app')
    store.commit('auth/setAuthStateIsReady', true);
    store.commit('auth/setUser', user)
    console.log("auth state change in onAuthStateChange")
    unsubscribe()
})

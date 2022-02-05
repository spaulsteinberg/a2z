import { createStore, /* createLogger */ } from 'vuex';
import authModule from './modules/authModule';


const store = createStore({
    plugins: [/* createLogger() */],
    modules: {
        auth: authModule
    }
})

export default store;
import { createStore, /* createLogger */ } from 'vuex';
import authModule from './modules/authModule';
import googleMapsModule from './modules/googleMapsModule';


const store = createStore({
    plugins: [/* createLogger() */],
    modules: {
        auth: authModule,
        googleMaps: googleMapsModule
    }
})

export default store;
import { createStore, /* createLogger */ } from 'vuex';
import accountModule from './modules/accountModule';
import authModule from './modules/authModule';
import googleMapsModule from './modules/googleMapsModule';


const store = createStore({
    plugins: [/* createLogger() */],
    modules: {
        auth: authModule,
        googleMaps: googleMapsModule,
        account: accountModule
    }
})

export default store;
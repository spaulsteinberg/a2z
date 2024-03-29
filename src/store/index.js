import { createStore, /* createLogger */ } from 'vuex';
import accountModule from './modules/accountModule';
import authModule from './modules/authModule';
import googleMapsModule from './modules/googleMapsModule';
import requestModule from './modules/requestModule';
import ticketModule from './modules/ticketModule';


const store = createStore({
    plugins: [/* createLogger() */],
    modules: {
        auth: authModule,
        googleMaps: googleMapsModule,
        account: accountModule,
        ticket: ticketModule,
        request: requestModule
    }
})

export default store;
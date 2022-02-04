import { createStore } from 'vuex';
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const store = createStore({
    state: {
        user: null,
        authIsReady: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthStateIsReady(state, payload) {
            state.authIsReady = payload
        }
    },
    actions: {
        async signup(context, { email, password }) {
            console.log("signing up...")
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if(res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error("Could not complete sign up.")
            }
        },
        async login(context, { email, password }) {
            console.log("logging in...")
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error("Login failed.")
            }
        },
        async logout(context) {
            await signOut(auth)
            context.commit('setUser', null)
        }
    }
})

export default store;
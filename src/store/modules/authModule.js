import { auth } from '../../firebase/config'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail 
} from 'firebase/auth';

const authModule = {
    namespaced: true,
    state: {
        user: null,
        authIsReady: false
    },
    getters: {
        getUser: state => state.user,
        getIsReadyState: state => state.authIsReady
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
        async signup({ commit }, { email, password }) {
            console.log("signing up...")
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if(res) {
                commit('setUser', res.user)
            } else {
                throw new Error("Could not complete sign up.")
            }
        },
        async login({ commit }, { email, password }) {
            console.log("logging in...")
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res) {
                commit('setUser', res.user)
            } else {
                throw new Error("Login failed.")
            }
        },
        async logout({ commit }) {
            await signOut(auth)
            commit('setUser', null)
        },
        async resendPassword(context, { email }) { 
            await sendPasswordResetEmail(auth, email)
        }
    }
}

export default authModule
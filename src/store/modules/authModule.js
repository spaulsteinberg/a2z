import { auth } from '../../firebase/config'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
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
        setUserEmail(state, payload) {
            state.user.email = payload
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
        },
        async updateEmail({commit}, { newEmail }){
            try {
                await updateEmail(auth.currentUser, newEmail)
                commit('setUserEmail', newEmail)
            } catch (err) {
                throw new Error(err.code)
            }
        },
        async changePassword(_, { newPassword }){
            try {
                await updatePassword(auth.currentUser, newPassword)
            } catch (err) {
                throw new Error(err.code)
            }
        }
    }
}

export default authModule
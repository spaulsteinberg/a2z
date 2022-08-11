import axios from 'axios'
import getFirebaseIdToken from '../../firebase/getFirebaseIdToken';
/*
Requests is an array of: 
    id: "",
    createdByUser: "",
    isAccepted: false,
    isClosed: false,
    uid: {},
    uids: []
*/
const initialState = () => {
    return {
        requests: [],
        loading: false,
        error: ''
    }
}

const requestModule = {
    namespaced: true,
    state: initialState,
    getters: {
        getHasRequests: state => state.requests.length > 0,
        getIsLoading: state => state.loading,
        getHasError: state => state.error ? true : false,
        getRequests: state => state.requests
    },
    mutations: {
        setLoading: (state, payload) => state.loading = payload,
        setError: (state, payload) => state.error = payload,
        setRequests: (state, payload) => state.requests = payload,
        reset: state => {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    },
    actions: {
        async getAllUserRequests({ commit }, payload) {
            try {
                commit('setLoading', true)
                const token = await getFirebaseIdToken(payload.user).catch(err => { throw new Error("Could not get ID token") })
                const res = await axios.get(`${process.env.VUE_APP_REQUEST_PATH}/all`, { headers: { token } }).catch(err => {
                    console.log(err)
                    commit('setError', "Could not get user requests")
                })
                console.log(res.data)
                commit('setRequests', res.data.requests)
            } catch (err) {
                commit('setError', err.message)
            } finally { commit('setLoading', false) }
        }
    }
}

export default requestModule
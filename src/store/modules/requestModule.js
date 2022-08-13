import axios from 'axios'
import RequestStatus from '../../constants/RequestStatus';
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
        getRequests: state => state.requests,
        getClosedStatusById: (state) => (id) => state.requests.find(req => req.id === id).isClosed,
        getRequestById: state => id => state.requests.find(req => req.id === id)
    },
    mutations: {
        setLoading: (state, payload) => state.loading = payload,
        setError: (state, payload) => state.error = payload,
        setRequests: (state, payload) => state.requests = payload,
        setRequestCloseStatus: (state, { id, isClosed }) => {
            state.requests.find(req => req.id === id).isClosed = isClosed
        },
        setRequestUidRejected: (state, { id, uid }) => {
            state.requests.find(req => req.id === id).uid[uid].status = RequestStatus.REJECTED
        },
        setRequestUidAccepted: (state, { id, uid }) => {
            const ticketIndex = state.requests.findIndex(req => req.id === id)
            state.requests[ticketIndex].isAccepted = true
            state.requests[ticketIndex].isClosed = true
            for (const userId of state.requests[ticketIndex].uids) {
                if (userId === uid) {
                    state.requests[ticketIndex].uid[userId].status = RequestStatus.ACCEPTED
                } else {
                    state.requests[ticketIndex].uid[userId].status = RequestStatus.REJECTED
                }
            }
        },
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
        },
        async postClosedStatus({ commit }, { user, id, closed }) {
            try {
                console.log(id, closed)
                let closeYn = closed ? "yes" : "no"
                const token = await getFirebaseIdToken(user).catch(err => { throw new Error("Could not get ID token") })
                const res = await axios.post(`${process.env.VUE_APP_REQUEST_PATH}/request/close/${id}?closed=${closeYn}`, {}, { headers: { token } })
                res && commit('setRequestCloseStatus', { id, isClosed: closed })
            } catch (err) {
                throw new Error(err)
            }
        },
        async postRejectStatus({ commit }, { user, id, uid }) {
            try {
                const token = await getFirebaseIdToken(user).catch(err => { throw new Error("Could not get ID token") })
                const res = await axios.post(`${process.env.VUE_APP_REQUEST_PATH}/request/reject/${id}/${uid}`, {}, { headers: { token } })
                res && commit('setRequestUidRejected', { id, uid })
            } catch (err) {
                throw new Error(err)
            }
        },
        async postAcceptStatus({ commit }, { user, id, uid }) {
            try {
                const token = await getFirebaseIdToken(user).catch(err => { throw new Error("Could not get ID token") })
                const res = await axios.post(`${process.env.VUE_APP_REQUEST_PATH}/request/accept/${id}/${uid}`, {}, { headers: { token } })
                res && commit('setRequestUidAccepted', { id, uid })
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

export default requestModule
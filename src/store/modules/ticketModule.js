import getFirebaseIdToken from '../../firebase/getFirebaseIdToken'
import axios from 'axios'

const initialState = () => {
    return {
        hasData: false,
        isLoading: false,
        error: '',
        filterValue: '',
        tickets: [],
    }
}

const ticketModule = {
    namespaced: true,
    state: initialState,
    getters: {
        getHasData: state => state.hasData,
        getFilterValue: state => state.filterValue,
        getFilteredTickets: state => { 
            if (!state.filterValue) return state.tickets
            return state.tickets.filter(ticket => ticket.ticketId.includes(state.filterValue))
        }
    },
    mutations: {
        setHasData: (state, payload) => state.hasData = payload,
        setIsLoading: (state, payload) => state.isLoading = payload,
        setError: (state, payload) => state.error = payload,
        setTickets: (state, payload) => state.tickets = payload,
        addTicket: (state, payload) => { state.tickets.push(payload) },
        setFilterValue: (state, payload) => state.filterValue = payload,
        setPatchedTicket: (state, payload) => {
            console.log("IN PATCH", payload)
            state.tickets[payload.index].base_pay = payload.basePay
            state.tickets[payload.index].rate_per_mile = payload.ratePerMile
            state.tickets[payload.index].hasStatus = payload.hasStatus
            state.tickets[payload.index].description = payload.description
            state.tickets[payload.index].total = payload.total
        }
    },
    actions: {
        async getTickets({ commit }, payload) {
            try {
                commit('setIsLoading', true)
                commit('setError', '')
                commit('setHasData', false)
                const token = await getFirebaseIdToken(payload.user)
                const tickets = await axios.get(process.env.VUE_APP_TICKET_PATH, { headers: { token: token } })
                commit('setTickets', tickets.data.tickets)
                commit('setHasData', true)
                console.log(tickets.data.tickets)
            } catch (err) {
                console.log(err)
                commit('setError', 'Something went wrong.')
            } finally { commit('setIsLoading', false) }
        },
        async postTicket({ commit }, payload) {
            try {
                const token = await getFirebaseIdToken(payload.user)
                const response = await axios.post(process.env.VUE_APP_TICKET_PATH, payload.request , { headers: { token: token } })
                console.log(response)
                commit('addTicket', response.data.ticket)
            } catch (err) {
                console.log(err)
                throw new Error(err.message)
            }
        },
        async patchTicket({ commit }, payload) {
            try {
                console.log(payload)
                const token = await getFirebaseIdToken(payload.user)
                const response = await axios.patch(process.env.VUE_APP_TICKET_PATH, payload.request , { headers: { token: token } })
                commit('setPatchedTicket', { index: payload.index, ...payload.request})
            } catch (err) {
                console.log(err)
                throw new Error(err.message)
            }
        }
    }
}

export default ticketModule
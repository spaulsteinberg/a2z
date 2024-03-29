import getFirebaseIdToken from '../../firebase/getFirebaseIdToken'
import axios from 'axios'
import TicketStatus from "../../constants/TicketStatus"

const initialState = () => {
    return {
        hasData: false,
        isLoading: false,
        error: '',
        filterValue: '',
        statusValue: '',
        originFilterValue: '',
        destinationFilterValue: '',
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
            if (!state.filterValue && !state.statusValue && !state.originFilterValue && !state. destinationFilterValue) return state.tickets
            let tix = state.tickets
            if (state.filterValue) {
                tix = tix.filter(ticket => {
                    const tick = ticket.ticketId.toLowerCase()
                    return tick.includes(state.filterValue.toLowerCase())
                })
            }
            if (state.originFilterValue) {
                tix = tix.filter(ticket => ticket.start_city_state.toLowerCase().includes(state.originFilterValue.toLowerCase()))
            }
            if (state.destinationFilterValue) {
                tix = tix.filter(ticket => ticket.end_city_state.toLowerCase().includes(state.destinationFilterValue.toLowerCase()))
            }
            if (state.statusValue) {
                tix = tix.filter(ticket => ticket.hasStatus.toUpperCase() === state.statusValue.toUpperCase())
            }
            return tix
        },
        getNumberOfOpenTickets: state => state.tickets.filter(t => t.hasStatus === TicketStatus.OPEN).length,
        getNumberOfInProgressTickets: state => state.tickets.filter(t => t.hasStatus === TicketStatus.IN_PROGRESS).length,
        getNumberOfCompletedTickets: state => state.tickets.filter(t => t.hasStatus === TicketStatus.COMPLETED).length,
        getNumberOfCancelledTickets: state => state.tickets.filter(t => t.hasStatus === TicketStatus.CANCELLED).length,
        getOpenTicketCostBasis: state => state.tickets.filter(t => t.hasStatus === TicketStatus.OPEN).reduce((acc, cur) => acc + parseFloat(cur.total), 0),
        getInProgressTicketCostBasis: state => state.tickets.filter(t => t.hasStatus === TicketStatus.IN_PROGRESS).reduce((acc, cur) => acc + parseFloat(cur.total), 0),
        getCompletedTicketCostBasis: state => state.tickets.filter(t => t.hasStatus === TicketStatus.COMPLETED).reduce((acc, cur) => acc + parseFloat(cur.total), 0),  
        getCancelledTicketCostBasis: state => state.tickets.filter(t => t.hasStatus === TicketStatus.CANCELLED).reduce((acc, cur) => acc + parseFloat(cur.total), 0)    
    },
    mutations: {
        setHasData: (state, payload) => state.hasData = payload,
        setIsLoading: (state, payload) => state.isLoading = payload,
        setError: (state, payload) => state.error = payload,
        setTickets: (state, payload) => state.tickets = payload,
        addTicket: (state, payload) => { state.tickets.push(payload) },
        setFilterValue: (state, payload) => state.filterValue = payload,
        setStatusValue: (state, payload) => state.statusValue = payload,
        setOriginFilterValue: (state, payload) => state.originFilterValue = payload,
        setDestinationFilterValue: (state, payload) => state.destinationFilterValue = payload,
        setPatchedTicketByIndex: (state, payload) => {
            console.log("IN PATCH", payload)
            state.tickets[payload.index].base_pay = payload.basePay
            state.tickets[payload.index].rate_per_mile = payload.ratePerMile
            state.tickets[payload.index].hasStatus = payload.hasStatus
            state.tickets[payload.index].description = payload.description
            state.tickets[payload.index].total = payload.total
        },
        setPatchedTicketByID: (state, payload) => {
            let index = state.tickets.findIndex(ticket => ticket.ticketId === payload.ticketId)
            state.tickets[index].base_pay = payload.basePay
            state.tickets[index].rate_per_mile = payload.ratePerMile
            state.tickets[index].hasStatus = payload.hasStatus
            state.tickets[index].description = payload.description
            state.tickets[index].total = payload.total
        },
        setStatusChange: (state, payload) => {
            let index = state.tickets.findIndex(ticket => ticket.ticketId === payload.ticketId)
            state.tickets[index].hasStatus = payload.newStatus
        },
        removeTicket: (state, { ticketId }) => {
            let index = state.tickets.findIndex(ticket => ticket.ticketId === ticketId)
            state.tickets.splice(index, 1)
        },
        reset: state => {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
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
                await axios.patch(process.env.VUE_APP_TICKET_PATH, payload.request , { headers: { token: token } })
                if (payload.index >= 0) {
                    commit('setPatchedTicketByIndex', { index: payload.index, ...payload.request})
                } else {
                    commit('setPatchedTicketByID', payload.request)
                }
                
            } catch (err) {
                console.log(err)
                throw new Error(err.message)
            }
        },
        async deleteTicket({ commit }, { user, ticketId }) {
            try {
                const token = await getFirebaseIdToken(user)
                await axios.delete(`${process.env.VUE_APP_TICKET_PATH}/${ticketId}`, { headers: { token: token } })
                commit('removeTicket', { ticketId })
            } catch (err) {
                throw new Error(err.message)
            }       
        },
        async changeTicketStatus({ commit }, payload) {
            try {
                const token = await getFirebaseIdToken(payload.user)
                await axios.patch(`${process.env.VUE_APP_TICKET_PATH}/status/change?ticketId=${payload.ticketId}&newStatus=${payload.newStatus}`, {}, { headers: { token }})
                commit('setStatusChange', { ticketId: payload.ticketId, newStatus: payload.newStatus})
            } catch (err) {
                throw new Error(err.message)
            }
        }
    }
}

export default ticketModule
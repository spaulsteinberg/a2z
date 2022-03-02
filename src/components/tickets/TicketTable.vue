<template>
    <table class="table table-bordered border-dark">
        <thead>
            <tr>
                <th scope="col" v-for="header of headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="tickets.length > 0">
                <tr v-for="ticket of tickets" :key="ticket.ticketId">
                <td>{{ ticket.ticketId }}</td>
                <td>{{ ticket.start_city_state }}</td>
                <td>{{ ticket.end_city_state }}</td>
                <td>{{ ticket.created_at }}</td>
                <td>{{ ticket.hasStatus }}</td>
                <td>View link</td>
            </tr>
            </template>
            <tr v-else>
                <td colspan="6" class="text-center">
                    <p class="text-danger mt-2">No data to display.</p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { getAuth } from "firebase/auth"
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

export default {
    name: 'TicketTable',
    components: { },
    setup() {
        /* 
            TODO 
             - loading and error when need to fetch
             - filtering/sorting/pagination/etc
        */
        const store = useStore()
        const auth = getAuth()
        const headers = ["ID", "Origin", "Destination", "Created At", "Status", "View Ticket"]
        const tickets = computed(() => store.getters["ticket/getFilteredTickets"])
        onMounted(() => {
            if (!store.getters["ticket/getHasData"]) {
                store.dispatch("ticket/getTickets", { user: auth.currentUser })
            }
        })

        return {
            headers,
            tickets
        }
    }
}
</script>

<style scoped></style>
<template>
    <template v-if="ticketsExist">
        <TicketCard 
            v-for="ticket of tickets.slice(0, 5)" 
            :key="ticket.ticketId"
            :tripDuration="ticket.est_duration" 
            :tripValue="ticket.total"
            :startPlaceFormatted="ticket.start_city_state"
            :endPlaceFormatted="ticket.end_city_state"
            :status="ticket.hasStatus">
        </TicketCard>
        <div class="text-center">
            <button class="btn btn-primary"><router-link to="/profile/account/tickets" class="view-all">View All</router-link></button>
        </div>
    </template>
    <AZFeedbackAlert text="No tickets to display!" severity="primary" centered v-else />
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import TicketCard from "../../ticket/TicketCard.vue"
import AZFeedbackAlert from "../../utility/AZFeedbackAlert.vue"

export default {
    name: 'RecentTicketCards',
    components: { TicketCard, AZFeedbackAlert },
    props: {},
    setup(){
        const { state } = useStore()
        const tickets = computed(() => state.ticket.tickets)
        const ticketsExist = computed(() => state.ticket.tickets.length > 0)

        return {
            tickets,
            ticketsExist,
        }
    }
}
</script>

<style scoped>
.view-all {
    text-decoration: none;
    color: white;
}
</style>
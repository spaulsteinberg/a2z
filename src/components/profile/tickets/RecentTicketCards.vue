<template>
    <template v-if="ticketsExist">
        <TicketCard 
            v-for="(ticket, i) of tickets.slice(0, 5)" 
            :key="ticket.ticketId"
            :tripDuration="ticket.est_duration" 
            :tripValue="ticket.total"
            :startPlaceFormatted="ticket.start_city_state"
            :endPlaceFormatted="ticket.end_city_state"
            :status="ticket.hasStatus"
            @viewClick="handleOpenModal(i)">
        </TicketCard>
        <div class="text-center">
            <button class="btn btn-primary"><router-link to="/profile/account/tickets" class="view-all">View All</router-link></button>
        </div>
    </template>
    <AZFeedbackAlert text="No tickets to display!" severity="primary" centered v-else />
    <ViewTicketModal @closeModal="handleCloseModal" :ticket="modalData" :ticketIndex="ticketIndex" :viewOnly="modalData.hasStatus !== openTicketStatus" v-if="showModal" />
</template>

<script>
import { computed, ref } from "vue"
import { useStore } from "vuex"
import TicketStatus from "../../../constants/TicketStatus"
import TicketCard from "../../tickets/TicketCard.vue"
import AZFeedbackAlert from "../../utility/AZFeedbackAlert.vue"
import ViewTicketModal from "./ViewTicketModal.vue"

export default {
    name: 'RecentTicketCards',
    components: { TicketCard, AZFeedbackAlert, ViewTicketModal },
    props: {},
    setup(){
        const { state } = useStore()
        const tickets = computed(() => state.ticket.tickets)
        const ticketsExist = computed(() => state.ticket.tickets.length > 0)
        const showModal = ref(false)
        const modalData = ref(null)
        const ticketIndex = ref(null)

        const handleOpenModal = indx => {
            console.log(tickets.value[indx])
            modalData.value = tickets.value[indx]
            ticketIndex.value = indx
            showModal.value = true
        }
        const handleCloseModal = () => {
            showModal.value = false
            modalData.value = null
            ticketIndex.value = null
        }

        return {
            tickets,
            ticketsExist,
            modalData,
            ticketIndex,
            showModal,
            handleOpenModal,
            handleCloseModal,
            openTicketStatus: TicketStatus.OPEN
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
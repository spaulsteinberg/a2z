<template>
    <div class="dialog-info-container">
        <TicketInfoRow
            titleFirst="Base Pay"
            :itemFirst="'$' + ticket.base_pay"
            titleSecond="Rate/mile"
            :itemSecond="'$' + ticket.rate_per_mile"
            titleThird="Total"
            :itemThird="'$' + parseFloat(ticket.total).toFixed(2)"
        />
        <TicketInfoRow
            titleFirst="Duration"
            :itemFirst="ticket.est_duration"
            titleSecond="Distance"
            :itemSecond="ticket.distance_formatted"
            titleThird="Status"
            :itemThird="ticket.hasStatus"
        />
        <div class="text-center w-100 mt-4">{{ ticket.description }}</div>
    </div>
</template>

<script>
import TicketInfoRow from "./TicketInfoRow.vue";
export default {
    name: 'TicketDisplay',
    props: {
        ticket: {
            type: Object,
            required: true
        }
    },
    components: { TicketInfoRow }
}
</script>

<style scoped>
.dialog-info-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: left;
    padding: 0;
}

.dialog-info-row {
    display: flex;
    flex-direction: column;
    flex: 0 0 100%;
    width: 100%;
}

@media screen and (min-width: 500px) {
    .dialog-info-container {
        flex-direction: row;
        padding: 0 1rem;
    }
    .dialog-info-row {
        flex: 0 0 50%;
        width: 50%;
    }
}

@media screen and (min-width: 768px) {
    .dialog-info-container {
        padding: 0 1.5rem;
    }
}
</style>
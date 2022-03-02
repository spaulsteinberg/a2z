<template>
    <AZInputGroup id="ticketId" v-model="ticketId" labelText="Search By Ticket ID" type="text" />
</template>

<script>
import { onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import AZInputGroup from "../utility/AZInputGroup.vue";
export default {
    name: 'TicketSearch',
    components: { AZInputGroup },
    setup() {
        const store = useStore()
        const ticketId = ref('')

        watch(() => ticketId.value, (newValue) => {
                console.log("indiv first new is", newValue)
                store.commit("ticket/setFilterValue", newValue)
            }, {
                immediate: true
            })
        onUnmounted(() => {
            store.commit("ticket/setFilterValue", '')
        })

        return {
            ticketId,
        }
    }
}
</script>

<style scoped>
</style>
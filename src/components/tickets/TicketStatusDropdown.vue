<template>
    <AZSelectGroup :items="items" id="selectFilterDrop" :labelText="selectLabel" v-model="hasStatus" :isInvalid="false" />
</template>

<script>
import { onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import TicketStatus from "../../constants/TicketStatus";
import AZSelectGroup from "../utility/AZSelectGroup.vue";
export default {
    name: 'TicketStatusDropdown',
    components: {
        AZSelectGroup
    },
    setup() {
        const items = ['', TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.COMPLETED, TicketStatus.CANCELLED]
        const selectLabel = "Filter by Status"
        const hasStatus = ref('')
        const store = useStore()
        watch(() => hasStatus.value, (newValue) => {
            console.log("ticket status new val", newValue)
            store.commit("ticket/setStatusValue", newValue)
        }, {
            immediate: false
        })
        onUnmounted(() => {
            store.commit("ticket/setStatusValue", "")
        })
        return {
            items,
            selectLabel,
            hasStatus
        }
    }
}
</script>

<style scoped>
</style>
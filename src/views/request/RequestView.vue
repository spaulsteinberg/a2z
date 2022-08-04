<template>
    <div class="p-3">
        <RequestsHeader />
        <RequestTable @openModal="setOpen" />
    </div>
    <RequestModal v-if="open" :data="modalData" @closeModal="setClosed"/>
</template>

<script>
import RequestTable from '../../components/requests/RequestTable.vue'
import RequestsHeader from '../../components/requests/RequestsHeader.vue'
import RequestModal from '../../components/requests/RequestModal.vue'
import { ref } from 'vue'
export default {
    setup() {
        const open = ref(false)
        const modalData = ref(null)
        const setOpen = row => {
            modalData.value = row
            open.value = true
        }
        const setClosed = () => open.value = false
        return {
            open, modalData, setOpen, setClosed
        }
    },
    components: { RequestTable, RequestsHeader, RequestModal }
}
</script>

<style scoped>
</style>
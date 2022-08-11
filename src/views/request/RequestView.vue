<template>
    <div class="p-3">
        <RequestsHeader />
        <div class="text-center" v-if="requestsLoading">
            <AZLoadingSpinner spinnerColor="primary" />
        </div>
        <AZFeedbackAlert text="An error occurred loading requests." severity="danger" centered v-else-if="requestsError"/>
        <RequestTable :requests="requests" @openModal="setOpen" v-else/>
    </div>
    <RequestModal v-if="open" :data="modalData" @closeModal="setClosed"/>
</template>

<script>
import RequestTable from '../../components/requests/RequestTable.vue'
import RequestsHeader from '../../components/requests/RequestsHeader.vue'
import RequestModal from '../../components/requests/RequestModal.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getAuth } from '@firebase/auth'
import { AZLoadingSpinner, AZFeedbackAlert } from '../../components/utility'
export default {
    setup() {
        const open = ref(false)
        const modalData = ref(null)
        const { state, getters, dispatch } = useStore()
        const auth = getAuth()
        const hasRequests = getters["request/getHasRequests"]
        const requestsLoading = computed(() => getters["request/getIsLoading"])
        const requestsError = computed(() => getters["request/getHasError"])
        const requests = computed(() => getters["request/getRequests"])
        console.log(requests)

        onMounted(() => {
            !hasRequests && dispatch("request/getAllUserRequests", { user: auth.currentUser })
        })
        const setOpen = row => {
            modalData.value = row
            open.value = true
        }
        const setClosed = () => open.value = false
        return {
            open, modalData, setOpen, setClosed, requestsLoading, requestsError, requests
        }
    },
    components: { RequestTable, RequestsHeader, RequestModal, AZLoadingSpinner, AZFeedbackAlert }
}
</script>

<style scoped>
</style>
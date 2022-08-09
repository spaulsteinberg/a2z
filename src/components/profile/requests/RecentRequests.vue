<template>
    <template v-if="requests && requests.length > 0">
        <RequestCard 
            v-for="request of requests.slice(0, 5)" 
            :key="request.id" 
            :request="request" 
            :numRequests="request.uids.length"
            :ticketId="request.id"
            @viewArrowClick="handleRedirectToTableWithContext(request.id)" 
        />
    </template>
    <div class="text-center mt-3" v-else>
        <p>No data to display.</p>
    </div>
    <div class="text-center" v-if="requests && requests.length > 0">
        <button class="btn btn-primary" @click="handleRedirectToTableWithContext(null)">View All</button>
    </div>
    <!-- 
        - Show be cards with recent requests ordered by most recent
        - on click show user profile
        - show be able to accept, reject
        - View All to go to table view
     -->
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import RequestCard from './RequestCard.vue'

export default {
    setup(props, context) {
        const router = useRouter()
        const { state } = useStore()
        // TODO -- add notification id so it can be looked up, nested for loop to show all requests for all tickets
        const requests = computed(() => state.request.requests)
        console.log("REQUESTS", requests.value)
        const handleRedirectToTableWithContext = id => {
            // redirect with a context placeholder
            // if null (like on the view all click), still redirect and process that there
            console.log("Redirected with ID", id)
            router.push({ name: 'RequestHistory', params: { id } })
        }

        return {
            requests,
            handleRedirectToTableWithContext
        };
    },
    components: { RequestCard }
}
</script>

<style scoped>
</style>
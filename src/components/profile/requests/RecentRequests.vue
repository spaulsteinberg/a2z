<template>
    <RequestCard 
        v-for="notif of notificationObjs" 
        :key="notif.id" 
        :notif="notif"
        @viewArrowClick="handleRedirectToTableWithContext(notif.id)" 
    />
    <div class="text-center" v-if="notificationObjs && notificationObjs.length > 0">
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
import { useRouter } from 'vue-router'
import RequestCard from './RequestCard.vue'

export default {
    setup(props, context) {
        const router = useRouter()
        const handleRedirectToTableWithContext = id => {
            // redirect with a context placeholder
            // if null (like on the view all click), still redirect and process that there
            console.log("Redirected with ID", id)
            router.push({ path: '/requests', params: { id }})
        }

        // placeholder data
        const notificationObjs = [
            {
                id: "ticketId1",
                isAccepted: false,
                isClosed: false,
                requests: [
                    {
                        uid: "uid1",
                        status: "WAITING",
                        name: "Jarvis",
                        imageUrl: "hello",
                        completedTrips: 4
                    },
                    {
                        uid: "uid2",
                        status: "WAITING",
                        name: "Giles",
                        imageUrl: "hello",
                        completedTrips: 2
                    }
                ]
            },
            {
                id: "ticketId2",
                isAccepted: true,
                isClosed: false,
                requests: [
                    {
                        uid: "uid1",
                        status: "WAITING",
                        name: "Evil Jarvis",
                        imageUrl: "hello",
                        completedTrips: 8
                    },
                    {
                        uid: "uid2",
                        status: "WAITING",
                        name: "Evil Giles",
                        imageUrl: "hello",
                        completedTrips: 29
                    }
                ]
            }
        ];
        return {
            notificationObjs,
            handleRedirectToTableWithContext
        };
    },
    components: { RequestCard }
}
</script>

<style scoped>
</style>
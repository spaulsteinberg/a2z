<template>
    <el-table :data="tickets" border style="width: 100%">
        <el-table-column prop="ticketId" label="Ticket ID" width="200" />
        <el-table-column prop="start_city_state" label="Origin" />
        <el-table-column prop="end_city_state" label="Destination" />
        <el-table-column prop="created_at" label="Created" />
        <el-table-column prop="hasStatus" label="Status" />
        <el-table-column label="View Ticket" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="numberOfTickets" :page-size="pageSize" @current-change="setPage">
  </el-pagination>
</template>

<script>
import { getAuth } from "firebase/auth"
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'

export default {
    name: 'TicketTable',
    components: { ElTable, ElTableColumn, ElPagination },
    setup() {
        /* 
            TODO 
             - loading and error when need to fetch
             - filtering/sorting/pagination/etc
             <tr v-for="ticket of tickets" :key="ticket.ticketId">
                <td>{{ ticket.ticketId }}</td>
                <td>{{ ticket.start_city_state }}</td>
                <td>{{ ticket.end_city_state }}</td>
                <td>{{ ticket.created_at }}</td>
                <td>{{ ticket.hasStatus }}</td>
                <td>View link</td>
        */
        const store = useStore()
        const auth = getAuth()
        const headers = ["ID", "Origin", "Destination", "Created At", "Status", "View Ticket"]
        const page = ref(1)
        const pageSize = 10
        const tickets = computed(() => store.getters["ticket/getFilteredTickets"].slice(pageSize * page.value - pageSize, pageSize * page.value))
        const numberOfTickets = computed(() => store.getters["ticket/getFilteredTickets"].length)
        onMounted(() => {
            if (!store.getters["ticket/getHasData"]) {
                store.dispatch("ticket/getTickets", { user: auth.currentUser })
            }
        })

        const setPage = p => page.value = p

        return {
            headers,
            tickets,
            numberOfTickets,
            pageSize,
            setPage
        }
    }
}
</script>

<style scoped></style>
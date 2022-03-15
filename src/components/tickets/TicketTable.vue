<template>
    <el-table :data="tickets" border style="width: 100%">
        <el-table-column prop="ticketId" label="Ticket ID" width="200" />
        <el-table-column prop="start_city_state" label="Origin" sortable/>
        <el-table-column prop="end_city_state" label="Destination" sortable/>
        <el-table-column prop="created_at" label="Created" sortable/>
        <el-table-column prop="hasStatus" label="Status" sortable/>
        <el-table-column label="View Ticket" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="numberOfTickets" :page-size="pageSize" @current-change="setPage">
  </el-pagination>
</template>

<script>
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'

export default {
    name: 'TicketTable',
    components: { ElTable, ElTableColumn, ElPagination },
    setup() {
        const store = useStore()
        const page = ref(1)
        const pageSize = 10
        const tickets = computed(() => store.getters["ticket/getFilteredTickets"].slice(pageSize * page.value - pageSize, pageSize * page.value))
        const numberOfTickets = computed(() => store.getters["ticket/getFilteredTickets"].length)

        const setPage = p => page.value = p

        return {
            tickets,
            numberOfTickets,
            pageSize,
            setPage
        }
    }
}
</script>

<style scoped></style>
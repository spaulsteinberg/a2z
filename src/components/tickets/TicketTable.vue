<template>
    <el-table :data="tickets" border style="width: 100%">
        <el-table-column prop="ticketId" label="Ticket ID" width="200" />
        <el-table-column prop="start_city_state" label="Origin" sortable />
        <el-table-column prop="end_city_state" label="Destination" sortable />
        <el-table-column prop="created_at" label="Created" sortable />
        <el-table-column prop="hasStatus" label="Status" sortable />
        <el-table-column label="Operations" fixed="right">
            <template v-slot="scope">
                <!-- {{ scope.row }} -->
                <div class="table-ops-container">
                    <button class="btn btn-primary mx-1 mt-1" @click="handleOpenModal(scope.row)">
                        <ActionIcon />
                    </button>
                    <button class="btn btn-danger mx-1 mt-1" @click="handleOpenConfirmModal(scope.row)" v-if="scope.row.hasStatus === openTicketType">
                        <ActionIcon variant="trash" />
                    </button>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="numberOfTickets"
        :page-size="pageSize"
        @current-change="setPage"
    ></el-pagination>
    <ViewTicketModal @closeModal="handleCloseModal" :ticket="modalData" :viewOnly="modalData.hasStatus !== openTicketType" v-if="showModal" />
    <AZCCModal @closeModal="handleCloseConfirmModal" @handleConfirm="handleConfirmDelete" :title="modalData.title" :body="modalData.body" v-if="showConfirmModal" />

</template>

<script>
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import ActionIcon from "../icons/ActionIcon.vue"
import TicketStatus from "../../constants/TicketStatus"
import ViewTicketModal from "../profile/tickets/ViewTicketModal.vue"
import { AZCCModal } from "../utility"

export default {
    name: 'TicketTable',
    components: { ElTable, ElTableColumn, ElPagination, ActionIcon, ViewTicketModal, AZCCModal },
    setup() {
        const store = useStore()
        const page = ref(1)
        const showModal = ref(false)
        const showConfirmModal = ref(false)
        const modalData = ref(null)
        const pageSize = 10
        const openTicketType = TicketStatus.OPEN
        const tickets = computed(() => store.getters["ticket/getFilteredTickets"].slice(pageSize * page.value - pageSize, pageSize * page.value))
        const numberOfTickets = computed(() => store.getters["ticket/getFilteredTickets"].length)

        const setPage = p => page.value = p
        const handleOpenModal = data => {
            console.log(data)
            modalData.value = data
            showModal.value = true
        }
        const handleCloseModal = () => {
            showModal.value = false
            modalData.value = null
        }

        const handleOpenConfirmModal = data => {
            modalData.value = {
                title: "Confirm Ticket Deletion",
                body: `<p>Ticket ID: ${data.ticketId}</p><p>Are you sure you want to delete this ticket from ${data.start_city_state} to ${data.end_city_state}?</p>`,
                id: data.ticketId
            }
            showConfirmModal.value = true
        }

        const handleCloseConfirmModal = () => {
            showConfirmModal.value = false
            modalData.value = null
        }

        const handleConfirmDelete = () => {
            console.log("confirm", modalData.value.id)
        }

        return {
            tickets,
            numberOfTickets,
            pageSize,
            openTicketType,
            setPage,
            handleOpenModal,
            handleCloseModal,
            handleOpenConfirmModal,
            handleCloseConfirmModal,
            showConfirmModal,
            showModal,
            handleConfirmDelete,
            modalData
        }
    }
}
</script>

<style scoped>
.table-ops-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
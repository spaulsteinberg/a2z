<template>
    <div class="table-wrapper">
        <el-table :data="data" border>
        <el-table-column prop="id" label="Ticket ID" width="200" />
        <el-table-column prop="isAccepted" label="Accepted" sortable>
            <template v-slot="scope">
                {{ scope.row.isAccepted ? "Yes" : "No" }}
            </template>
        </el-table-column>
        <el-table-column prop="isClosed" label="Closed" sortable>
            <template v-slot="scope">
                {{ scope.row.isClosed ? "Yes" : "No" }}
            </template>
        </el-table-column>
        <el-table-column label="Requests" fixed="right">
            <template v-slot="scope">
                <!-- {{ scope.row }} -->
                <div class="table-reqs" :id="scope.row.id">
                    <button class="btn btn-primary table-eye-btn">
                        <ActionIcon variant="eye" />
                    </button>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="numItems"
        :page-size="pageSize"
        @current-change="setPage"
    ></el-pagination>
    </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { computed, ref } from 'vue'
import ActionIcon from '../icons/ActionIcon.vue'

export default {
    setup() {
        const page = ref(1)
        /* simulated network call */
        const requestResponse = [
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
            },
            {
                id: "ticketId2",
                isAccepted: false,
                isClosed: false,
                requests: []
            },
        ]

        const numItems = computed(() => requestResponse.length)
        const setPage = p => page.value = p
        const pageSize = 10
        const data = computed(() => requestResponse.slice(pageSize * page.value - pageSize, pageSize * page.value))
        return {
            data,
            numItems,
            setPage,
            pageSize
        }
    },
    components: { ElTable, ElTableColumn, ElPagination, ActionIcon }
}
</script>

<style scoped>
.table-wrapper {
    width: 100%;
    margin: 0 auto;
    max-width: 700px;
}

.table-reqs {
    display: flex;
    justify-content: center;
}

.table-eye-btn {
    padding-top: .2rem;
}

@media screen and (min-width: 768px) {
    .table-wrapper {
        width: 70%;
    }
}
</style>
<template>
    <el-table :data="data" border class="table-wrapper">
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
</template>

<script>
import { ElTable, ElTableColumn } from 'element-plus'
import ActionIcon from '../icons/ActionIcon.vue'

export default {
    setup() {
        const data = [
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
        ]
        return {
            data
        }
    },
    components: { ElTable, ElTableColumn, ActionIcon }
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
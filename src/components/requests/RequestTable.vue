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
        <el-table-column prop="reqs" label="Apps" sortable>
            <template v-slot="scope">
                {{ scope.row.uids.length }}
            </template>
        </el-table-column>
        <el-table-column label="Requests" fixed="right">
            <template v-slot="scope">
                <!-- {{ scope.row }} -->
                <div class="table-reqs" :id="scope.row.id">
                    <button class="btn btn-primary table-eye-btn" @click="handleViewClick(scope.row)">
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
    props: {
        requests: {
            type: Array,
            required: true
        }
    },
    setup(props, context) {
        const page = ref(1)

        const handleViewClick = row => context.emit("openModal", row)

        const numItems = computed(() => props.requests.length)
        const setPage = p => page.value = p
        const pageSize = 10
        const data = computed(() => props.requests.slice(pageSize * page.value - pageSize, pageSize * page.value))
        return {
            data,
            numItems,
            setPage,
            pageSize,
            handleViewClick
        }
    },
    components: { ElTable, ElTableColumn, ElPagination, ActionIcon },
    emits: ["openModal"]
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
<template>
    <div class="p-3">
        <RequestsHeader />
        <RequestTable />
    </div>
</template>

<script>
import RequestTable from '../../components/requests/RequestTable.vue'
import RequestsHeader from '../../components/requests/RequestsHeader.vue'
export default {
    setup() {

    },
    components: { RequestTable, RequestsHeader }
}
</script>

<style scoped>
</style>
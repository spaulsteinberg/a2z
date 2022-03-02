<template>
    <div class="ticket-container">
        <div class="search-row-container mb-3">
            <div class="search">
                <TicketSearch />
            </div>
        </div>
        <TicketTable />
    </div>
</template>

<script>
import TicketTable from "../../components/tickets/TicketTable.vue";
import TicketSearch from "../../components/tickets/TicketSearch.vue";
export default {
    name: "TicketView",
    setup() {
    },
    components: { TicketTable, TicketSearch }
}
</script>

<style scoped>
.ticket-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 0 0 100%;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 5%;
    padding: 0 1rem;
    overflow: scroll;
}

.search-row-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
}
.search {
    flex: 0 0 100%;
    max-width: 300px;
}

@media screen and (min-width: 500px) {
    .search-row-container {
        flex-direction: row;
    }
    .search {
        width: 40%;
    }
}
@media screen and (min-width: 768px) {
    .ticket-container {
        flex: 0 0 75%;
        width: 75%;
        overflow: hidden;
    }
    .search {
        width: 30%;
    }
}
</style>
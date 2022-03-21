<template>
    <div class="ticket-container">
        <template v-if="!error">
            <template v-if="!loading">
                <div class="search-row-container mb-3">
                    <div class="search">
                        <TicketSearch />
                    </div>
                    <div class="status-search my-2">
                        <TicketStatusDropdown />
                    </div>
                    <div class="origin-search">
                        <TicketPlaceSearch isOrigin/>
                    </div>
                    <div class="origin-search status-search">
                        <TicketPlaceSearch :isOrigin="false"/>
                    </div>
                </div>
                <TicketTable />
            </template>
            <AZFeedbackAlert :text="loadingText" centered includeSpinner v-else />
        </template>
        <div :class="[isSmallScreen ? 'w-50' : 'w-100', 'mx-auto']" v-else>
            <AZFeedbackAlert :text="errorText" severity="danger" />
        </div>
    </div>
</template>

<script>
import TicketTable from "../../components/tickets/TicketTable.vue";
import TicketSearch from "../../components/tickets/TicketSearch.vue";
import TicketStatusDropdown from "../../components/tickets/TicketStatusDropdown.vue"
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getAuth } from "firebase/auth";
import AZFeedbackAlert from "../../components/utility/AZFeedbackAlert.vue";
import useWindowWidth from "../../composables/useWindowWidth";
import TicketPlaceSearch from "../../components/tickets/TicketPlaceSearch.vue";

export default {
    name: "TicketView",
    setup() {
        const store = useStore()
        const auth = getAuth()
        const loading = computed(() => store.state.ticket.isLoading)
        const error = computed(() => store.state.ticket.error)
        const loadingText = "Fetching tickets..."
        const errorText = "An error occurred loading your tickets. Please reload and try again."
        const isSmallScreen = useWindowWidth(500).isWidth
        onMounted(() => {
            if (!store.getters["ticket/getHasData"]) {
                store.dispatch("ticket/getTickets", { user: auth.currentUser })
            }
        })

        return {
            loading,
            error,
            loadingText,
            errorText,
            isSmallScreen
        }
    },
    components: { TicketTable, TicketSearch, AZFeedbackAlert, TicketStatusDropdown, TicketPlaceSearch }
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
    max-width: 1000px;
}

.search-row-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
}
.search, .status-search, .origin-search {
    flex: 0 0 100%;
    width: 100%;
    max-width: 300px;
}
.status-search {
    margin-left: 0rem;
}

@media screen and (min-width: 500px) {
    .search, .status-search, .origin-search {
        width: 40%;
    }
}
@media screen and (min-width: 768px) {
    .search-row-container {
        flex-direction: row;
        justify-content: flex-start;
    }
    .ticket-container {
        flex: 0 0 90%;
        width: 90%;
        overflow: hidden;
    }
    .search, .status-search, .origin-search {
        width: 30%;
    }
    .status-search {
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
@media screen and (min-width: 1072px) { .origin-search { margin: 0 !important}}
@media screen and (min-width: 1200px) {
    .ticket-container {
        flex: 0 0 82%;
        width: 82%;
        overflow: hidden;
    }
}
</style>
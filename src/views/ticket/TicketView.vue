<template>
    <div class="ticket-container">
        <template v-if="!error">
            <template v-if="!loading">
                <div class="search-row-container mb-3">
                    <div class="search">
                        <TicketSearch />
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getAuth } from "firebase/auth";
import AZFeedbackAlert from "../../components/utility/AZFeedbackAlert.vue";
import useWindowWidth from "../../composables/useWindowWidth";

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
    components: { TicketTable, TicketSearch, AZFeedbackAlert }
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
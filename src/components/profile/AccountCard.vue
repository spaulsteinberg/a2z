<template>
    <div class="account-container">
        <AZCard>
        <template v-slot:header>
            <h2 class="text-center">My Account</h2>
        </template>
        <template v-slot:content>
            <AccountAccordion 
                :accountLoading="accountLoading" 
                :accountError="accountError"
                :ticketLoading="ticketLoading"
                :ticketError="ticketError"
                :requestLoading="requestLoading"
                :requestError="requestError" />
        </template>
    </AZCard>
    </div>
</template>

<script>
    import { computed, onMounted } from "vue";
    import AZCard from "../utility/AZCard.vue";
    import AccountAccordion from "./AccountAccordion.vue";
    import { getAuth } from "firebase/auth";
    import { useStore } from "vuex";
    export default {
        name: 'AccountCard',
        components: { AZCard, AccountAccordion },
        setup(){
            const auth = getAuth()
            const { state, getters, dispatch } = useStore()

            const accountHasData = computed(() => state.account.hasData)
            const accountLoading = computed(() => state.account.isLoading)
            const accountError = computed(() => state.account.error)

            const ticketHasData = computed(() => state.ticket.hasData)
            const ticketLoading = computed(() => state.ticket.isLoading)
            const ticketError = computed(() => state.ticket.error)

            const requestHasData = getters["request/getHasRequests"]
            const requestLoading = getters["request/getIsLoading"]
            const requestError = computed(() => state.request.error)

            onMounted( async () => {
                if (!accountHasData.value) {
                    dispatch("account/getAccount", auth.currentUser)
                }
                if (!ticketHasData.value) {
                    dispatch("ticket/getTickets", { user: auth.currentUser })
                }
                !requestHasData && dispatch("request/getAllUserRequests", { user: auth.currentUser })
            })
            return {
                accountLoading, accountError, ticketLoading, ticketError, requestLoading, requestError
            }
        }
    }
</script>

<style scoped>
    .card {
        max-width: 700px;
        flex: 0 0 100%;
    }

    .account-container {
        padding: 0 1rem;
        margin: 4rem 0;
        display: flex;
        justify-content: center;
    }
</style>
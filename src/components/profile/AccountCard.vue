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
                :ticketError="ticketError" />
        </template>
    </AZCard>
    </div>
</template>

<script>
    import { computed, onMounted, reactive, toRefs } from "vue";
    import AZCard from "../utility/AZCard.vue";
    import AccountAccordion from "./AccountAccordion.vue";
    import { getAuth } from "firebase/auth";
    import { useStore } from "vuex";
    export default {
        name: 'AccountCard',
        components: { AZCard, AccountAccordion },
        setup(){
            const auth = getAuth()
            const store = useStore()

            const accountHasData = computed(() => store.state.account.hasData)
            const accountLoading = computed(() => store.state.account.isLoading)
            const accountError = computed(() => store.state.account.error)

            const ticketHasData = computed(() => store.state.ticket.hasData)
            const ticketLoading = computed(() => store.state.ticket.isLoading)
            const ticketError = computed(() => store.state.ticket.error)

            onMounted( async () => {
                if (!accountHasData.value) {
                    store.dispatch("account/getAccount", auth.currentUser)
                }
                if (!ticketHasData.value) {
                    store.dispatch("ticket/getTickets", { user: auth.currentUser })
                }
            })
            return {
                accountLoading, accountError, ticketLoading, ticketError
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
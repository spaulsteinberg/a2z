<template>
    <div class="account-container">
        <AZCard>
        <template v-slot:header>
            <h2 class="text-center">My Account</h2>
        </template>
        <template v-slot:content>
            <AccountAccordion :accountLoading="loading" :accountError="error" :store="store" :auth="auth" />
        </template>
    </AZCard>
    </div>
</template>

<script>
    import { onMounted, reactive, toRefs } from "vue";
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
            const accountState = reactive({
                loading: false,
                error: ''
            })

            onMounted( async () => {
                
                if (!store.getters["account/getHasData"]) {
                    console.log("getting account data...")
                    accountState.loading = true
                    accountState.error = ''
                    try {
                        await store.dispatch("account/getAccount", auth.currentUser)
                    } catch (err) {
                        console.log(err)
                        accountState.error = "An error occurred fetching your account."
                    } finally {
                        accountState.loading = false
                    }
                }
            })
            return {
                ...toRefs(accountState),
                store,
                auth
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
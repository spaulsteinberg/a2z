<template>
    <div class="account-container">
        <AZCard>
        <template v-slot:header>
            <h2 class="text-center">My Account</h2>
        </template>
        <template v-slot:content>
            <AccountAccordion />
        </template>
    </AZCard>
    </div>
</template>

<script>
    import AZCard from "../utility/AZCard.vue";
    import AccountAccordion from "./AccountAccordion.vue";
    export default {
        name: 'AccountCard',
        components: { AZCard, AccountAccordion },
        setup(){

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
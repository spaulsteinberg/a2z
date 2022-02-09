<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Update Email</h2>
        </template>
        <template v-slot:content>
            <UpdateEmail :currentEmail="email" :store="store" />
        </template>
    </AZCard>
</template>

<script>
import AZCard from "../../components/utility/AZCard.vue"
import UpdateEmail from "../../components/profile/UpdateEmail.vue"
import { useStore } from "vuex"
import { computed } from "vue"
    export default {
        name: 'UpdateEmailView',
        setup(){
            const store = useStore()
            
            return {
                email: computed(() => store.state.auth.user?.email),
                store: store
            }
        },
        components: {
            AZCard,
            UpdateEmail
        }
    }
</script>

<style scoped>
    .card {
        width: calc(100% - 2rem);
        max-width: 450px;
        margin: 2rem auto;
    }
</style>
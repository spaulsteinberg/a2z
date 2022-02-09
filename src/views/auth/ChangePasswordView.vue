<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Change Password</h2>
        </template>
        <template v-slot:content>
            <ChangePassword :email="email" />
        </template>
    </AZCard>
</template>

<script>
import AZCard from "../../components/utility/AZCard.vue"
import ChangePassword from "../../components/profile/ChangePassword.vue"
import { useStore } from "vuex"
import { computed } from "vue"
    export default {
        name: 'ChangePasswordView',
        setup(){
            const { state } = useStore()
            return {
                email: computed(() => state.auth.user.email)
            }
        },
        components: {
            AZCard,
            ChangePassword
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
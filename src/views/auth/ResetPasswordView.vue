<template>
    <AZCard>
        <template v-slot:header>
            <h2>Reset Password</h2>
        </template>
        <template v-slot:content>
                <AZInputGroup v-model.trim="email" id="email" labelText="Email: " hasMargin/>
                <button class="btn btn-warning auth-page-button" type="submit" v-if="!loading && !success" @click="handleResetClick">Reset Password</button>
                <div class="spinner-container" v-else-if="loading && !success">
                    <AZLoadingSpinner spinnerColor="primary" />
                </div>
                <AZFeedbackAlert 
                    v-else-if="!loading && success" 
                    severity="success"
                    text="Password reset! Check you email and then log in." 
                    />
                <AZErrorBlock :error="error" v-if="error"/>
                <div class="text-center">
                    <router-link to="/login" >Back to Login Page</router-link>
                </div>
        </template>
    </AZCard>
</template>

<script>
    import AZCard from "../../components/utility/AZCard.vue";
    import useAuthState from "../../composables/useAuthState";
    import AZInputGroup from "../../components/utility/AZInputGroup.vue";
    import AZLoadingSpinner from "../../components/utility/AZLoadingSpinner.vue";
    import AZErrorBlock from "../../components/utility/AZErrorBlock.vue";
    import { ref } from "vue";
    import AZFeedbackAlert from "../../components/utility/AZFeedbackAlert.vue";
    export default {
        name: 'ResetPasswordView',
        components: { AZCard, AZInputGroup, AZLoadingSpinner, AZErrorBlock, AZFeedbackAlert },
        setup(){
            const { email, store, loading, error} = useAuthState()
            const success = ref(false)

            const handleResetClick = async () => {
                loading.value = true
                error.value = null
                success.value = false
                try {
                    await store.dispatch('resendPassword', {email: email.value})
                    success.value = true
                } catch (err) {
                    error.value = "Could not send reset link."
                } finally {
                    loading.value = false
                }
            }

            return {
                email,
                success,
                loading,
                error,
                handleResetClick
            }
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
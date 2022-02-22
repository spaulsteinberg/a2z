<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Reset Password</h2>
        </template>
        <template v-slot:content>
            <AZInputGroup 
                v-model.trim="email" 
                id="email" 
                labelText="Email: "
                :handleBlur="v.email.$touch"
                :isInvalid="v.email.$error" 
                hasMargin/>
            <AZErrorBlock v-for="error of v.email?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
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
            <div class="text-center my-1">
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
    import { useVuelidate } from '@vuelidate/core'
    import { required, email as VuelidateEmail } from '@vuelidate/validators'
    import { computed } from "vue";
    export default {
        name: 'ResetPasswordView',
        components: { AZCard, AZInputGroup, AZLoadingSpinner, AZErrorBlock, AZFeedbackAlert },
        setup(){
            const { email, store, loading, error} = useAuthState()
            const success = ref(false)

            const rules = computed(() => ({
                email: { required, VuelidateEmail }
            }))

            const v = useVuelidate(rules, { email })

            const handleResetClick = async () => {
                if (v.value.$invalid) {
                    return error.value = "Please fill out all required fields."
                }
                loading.value = true
                error.value = null
                success.value = false
                try {
                    await store.dispatch('auth/resendPassword', {email: email.value})
                    success.value = true
                } catch (err) {
                    error.value = "Could not send reset link."
                } finally {
                    loading.value = false
                }
            }

            return {
                email,
                v,
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
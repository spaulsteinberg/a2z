<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Signup</h2>
        </template>
        <template v-slot:content>
            <form @submit.prevent="handleSignup">
                <AZInputGroup
                    type="text"
                    id="email"
                    v-model="email"
                    labelText="Email"
                    :handleBlur="v.email.$touch"
                    :isInvalid="v.email.$error"
                    hasMargin
                />
                <AZErrorBlock
                    v-for="error of v.email?.$errors"
                    :key="error.$uid"
                    :error="'*' + error.$message"
                    alignText="text-left"
                    :isSmall="true"
                />
                <AZInputGroup
                    type="password"
                    id="password"
                    v-model="password"
                    labelText="Password"
                    :handleBlur="v.password.$touch"
                    :isInvalid="v.password.$error"
                    hasMargin
                />
                <AZErrorBlock
                    v-for="error of v.password?.$errors"
                    :key="error.$uid"
                    :error="'*' + error.$message"
                    alignText="text-left"
                    :isSmall="true"
                />
                <AZInputGroup
                    type="text"
                    id="companyName"
                    v-model="companyName"
                    labelText="Company Name:"
                    :handleBlur="v.companyName.$touch"
                    :isInvalid="v.companyName.$error"
                    :hasMargin="false"
                />
                <AZErrorBlock
                    v-for="error of v.companyName?.$errors"
                    :key="error.$uid"
                    :error="'*' + error.$message"
                    alignText="text-left"
                    :isSmall="true"
                />
                <button
                    class="btn btn-primary auth-page-button"
                    type="submit"
                    :disabled="v.$invalid"
                    v-if="!loading"
                >Sign Up</button>
                <div class="spinner-container" v-else>
                    <AZLoadingSpinner spinnerColor="primary" />
                </div>
                <AZErrorBlock :error="error" v-if="error" />
            </form>
            <AZCenteredBoundary text="or" />
            <div class="text-center">
                Already have an account?
                <router-link to="/login">Log in</router-link>
            </div>
        </template>
    </AZCard>
</template>

<script>
import AZInputGroup from "../../components/utility/AZInputGroup.vue";
import AZCard from '../../components/utility/AZCard.vue';
import AZCenteredBoundary from '../../components/utility/AZCenteredBoundary.vue';
import AZLoadingSpinner from '../../components/utility/AZLoadingSpinner.vue';
import useAuthState from '../../composables/useAuthState';
import AZErrorBlock from "../../components/utility/AZErrorBlock.vue";
import { useVuelidate } from '@vuelidate/core'
import { minLength, maxLength, required, email as VuelidateEmail } from '@vuelidate/validators'
import { computed, ref } from "vue";

export default {
    name: 'SignupView',
    components: {
        AZInputGroup,
        AZCard,
        AZCenteredBoundary,
        AZLoadingSpinner,
        AZErrorBlock
    },
    setup() {

        const { store, router, email, password, loading, error } = useAuthState();

        const companyName = ref('')

        const rules = computed(() => ({
            email: { required, VuelidateEmail },
            password: { required, minLength: minLength(8), maxLength: maxLength(15), },
            companyName: { required }
        }))

        const v = useVuelidate(rules, { email, password, companyName })


        const handleSignup = async () => {
            if (v.value.$invalid) {
                return error.value = "Please fill out all required fields."
            }
            loading.value = true
            error.value = null
            const request = { companyName: companyName.value, firstName: '', lastName: '', phoneNumber: '', photoUrl: '', streetAddress: '', unit: '', zipCode: ''}
            try {
                const user = await store.dispatch('auth/signup', { email: email.value, password: password.value })
                await store.dispatch('account/postAccount', { user: user.auth.currentUser, request: request })
                loading.value = false
                router.push('/') // change this to main menu in future
            } catch (err) {
                console.log(err)
                error.value = 'Could not sign up. Please try again.'
                loading.value = false
            }
        }

        return {
            email, password, companyName, v, error, loading, handleSignup
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
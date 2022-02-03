<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Login</h2>
        </template>
        <template v-slot:content>
            <form @submit.prevent="handleLogin">
                <AZInputGroup type="text" id="email" v-model="email" labelText="Email" :hasMargin="noMargin" />
                <AZInputGroup type="password" id="password" v-model="password" labelText="Password" hasMargin />
                <button class="btn btn-primary auth-page-button" type="submit" v-if="!loading">Login</button>
                <div class="spinner-container" v-else>
                    <AZLoadingSpinner spinnerColor="primary" />
                </div>
                <AZErrorBlock :error="error" v-if="error"/>
            </form>
            <template v-if="!loading">
                <AZCenteredBoundary text="or" />
                <router-link to="/signup">
                    <button class="btn auth-page-button text-white" type="button" id="signup">Sign Up</button>
                </router-link>
                <div class="text-center">
                    <router-link to="/" >Forgot Password?</router-link>
                </div>
            </template>
        </template>
    </AZCard>
</template>

<script>
    import AZInputGroup from "../../components/utility/AZInputGroup.vue";
    import AZCard from '../../components/utility/AZCard.vue';
    import AZCenteredBoundary from '../../components/utility/AZCenteredBoundary.vue';
    import useAuthState from '../../composables/useAuthState';
    import AZLoadingSpinner from "../../components/utility/AZLoadingSpinner.vue";
import AZErrorBlock from "../../components/utility/AZErrorBlock.vue";
    export default {
    name: "LoginView",
    setup() {
        const { store, router, email, password, loading, error, noMargin } = useAuthState()

        const handleLogin = async () => {
            try {
                loading.value = true;
                error.value = null
                await store.dispatch('login', { email: email.value, password: password.value})
                loading.value = false;
                router.push('/profile/account') // change this
            } catch (err) {
                console.log(err)
                error.value = "Login failed. Please try again."
                loading.value = false
            }
        }

        return {
            email,
            password,
            loading, 
            error,
            noMargin,
            handleLogin,
        }
    },
    components: { AZInputGroup, AZCard, AZCenteredBoundary, AZLoadingSpinner, AZErrorBlock }
}
</script>

<style scoped>

    .card {
        width: 100%;
        max-width: 450px;
        margin: 2rem auto;
    }

    #signup {
        background-color: #d63384;
    }

</style>
<template>
    <AZCard>
        <template v-slot:header>
            <h2 class="text-center">Login</h2>
        </template>
        <template v-slot:content>
            <form @submit.prevent="handleLogin">
                <InputGroup type="text" id="username" v-model="username" labelText="Username" :hasMargin="noMargin" />
                <InputGroup type="password" id="password" v-model="password" labelText="Password" hasMargin />
                <button class="btn btn-primary login-page-button" type="submit">Login</button>
            </form>
            <div class="text-center">
                <router-link to="/" >Forgot Password?</router-link>
            </div>
            <TextCenteredBoundary text="or" />
            <button class="btn login-page-button text-white" type="button" id="signup" @click="handleRedirectSignUp">Sign Up</button>
        </template>
    </AZCard>
</template>

<script>
    import { ref } from 'vue';
    import InputGroup from "../../components/utility/InputGroup.vue";
    import AZCard from '../../components/utility/AZCard.vue';
import TextCenteredBoundary from '../../components/utility/TextCenteredBoundary.vue';
    export default {
    name: "LoginView",
    setup() {
        const username = ref('');
        const password = ref('');
        const noMargin = ref(false)

        const handleLogin = () => {
            console.log(username.value, password.value)
        }

        const handleRedirectSignUp = () => {
            console.log("redirect to sign up")
        }

        return {
            username,
            password,
            handleLogin,
            handleRedirectSignUp,
            noMargin
        }
    },
    components: { InputGroup, AZCard, TextCenteredBoundary }
}
</script>

<style scoped>

    .card {
        width: 100%;
        max-width: 450px;
        margin: 2rem auto;
    }

    .card-body {
        background-color: blue;
    }

    .login-page-button {
        width: 100%;
        margin: 1rem 0;
    }

    #signup {
        background-color: #d63384;
    }
</style>
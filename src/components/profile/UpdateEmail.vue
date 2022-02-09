<template>
    <form @submit.prevent="handleSubmitEmail">
        <div class="form-group email-wrapper">
            <label for="updateEmail">Email: </label>
            <input id="updateEmail" type="email" class="form-control" v-model="newEmail">
            
        </div>
        <div class="form-group email-wrapper my-2">
            <label for="reenterPassword" class="text-danger">Please re-enter you password: </label>
            <input id="reenterPassword" type="password" class="form-control" v-model="reenterPassword" required>
        </div>
        <template v-if="!loading">
            <button class="btn btn-warning my-2 w-100" type="submit" >Submit</button>
            <button class="btn btn btn-outline-info my-2 w-100" type="button" @click="handleBackToAccounts">Back to Accounts</button>
        </template>
        <div class="my-2 text-center" v-else>
            <AZLoadingSpinner spinnerColor="primary" />
        </div>
        <div v-if="error">
            <AZFeedbackAlert :text="error" severity="danger" :centered="true" />
        </div>
        <div v-if="success">
            <AZFeedbackAlert :text="success" severity="primary" :centered="true" />
        </div>
    </form>
</template>

<script>
    import { ref } from "vue"
    import reauthenticateWithEmailAndPassword from "../../firebase/reauthenticateWithEmailAndPassword"
    import AZLoadingSpinner from "../utility/AZLoadingSpinner.vue"
    import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue"
    import useChangeCredentials from "../../composables/useChangeCredentials";

    export default {
    name: "UpdateEmail",
    props: {
        currentEmail: {
            type: String,
            default: "",
            required: true
        },
        store: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const newEmail = ref(props.currentEmail);
        const reenterPassword = ref("");
        let { loading, success, error, handleBackToAccounts } = useChangeCredentials()

        const handleSubmitEmail = async () => {
            loading.value = true;
            error.value = null;
            success.value = null
            try {
                await reauthenticateWithEmailAndPassword(props.currentEmail, reenterPassword.value);
                await props.store.dispatch("auth/updateEmail", { newEmail: newEmail.value });
                success.value = `Successfully changed email to ${newEmail.value}`
                reenterPassword.value = ''
            }
            catch (err) {
                console.log(err);
                error.value = "Something went wrong. Please make sure you enter the current password for your account.";
            }
            finally {
                loading.value = false;
            }
        };
        return {
            newEmail,
            reenterPassword,
            loading, 
            success,
            error,
            handleBackToAccounts,
            handleSubmitEmail
        };
    },
    components: { AZLoadingSpinner, AZFeedbackAlert }
}
</script>

<style scoped>
    .email-wrapper {
        max-width: 490px;
    }
</style>
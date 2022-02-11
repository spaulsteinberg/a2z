<template>
    <form @submit.prevent="handleSubmitNewPassword">
        <div class="form-group password-wrapper">
            <label for="currentPassword">Current Password: </label>
            <input id="currentPassword" type="password" class="form-control" v-model="currentPassword">
        </div>
        <div class="form-group password-wrapper">
            <label for="updatePassword">New Password: </label>
            <input id="updatePassword" type="password" class="form-control" v-model="newPassword">
        </div>
        <div class="form-group password-wrapper">
            <label for="updateConfirmPassword">Confirm New Password: </label>
            <input id="updateConfirmPassword" type="password" class="form-control" v-model="newConfirmPassword">
        </div>

        <template v-if="!loading">
            <button class="btn btn-danger my-2 w-100" type="submit">Change Password</button>
            <button class="btn btn btn-outline-info my-2 w-100" type="button" @click="handleBackToAccounts">Back to Accounts</button>
        </template>
        <ProfileFeedback :loading="loading" :error="error" :success="success" />
    </form>
</template>

<script>
    import { ref } from "vue"
    import useChangeCredentials from "../../composables/useChangeCredentials"
    import reauthenticateWithEmailAndPassword from "../../firebase/reauthenticateWithEmailAndPassword"
    import ProfileFeedback from "./ProfileFeedback.vue"
    export default {
    name: "ChangePassword",
    props: {
        email: {
            type: String,
            required: true
        },
        store: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const currentPassword = ref("");
        const newPassword = ref("");
        const newConfirmPassword = ref("");
        let { loading, error, success, handleBackToAccounts } = useChangeCredentials();
        const handleSubmitNewPassword = async () => {
            // handle this validation with vuelidate when installed
            if (newPassword.value !== newConfirmPassword.value) {
                return;
            }
            loading.value = true;
            error.value = "";
            success.value = "";
            try {
                await reauthenticateWithEmailAndPassword(props.email, currentPassword.value);
                await props.store.dispatch("auth/changePassword", { newPassword: newPassword.value });
                success.value = `Password Reset!`;
                currentPassword.value = "";
                newPassword.value = "";
                newConfirmPassword.value = "";
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
            currentPassword,
            newPassword,
            newConfirmPassword,
            handleBackToAccounts,
            loading,
            error,
            success,
            handleSubmitNewPassword
        };
    },
    components: { ProfileFeedback }
}
</script>

<style scoped>
    .password-wrapper {
        max-width: 490px;
    }
</style>
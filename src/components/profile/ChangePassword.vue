<template>
    <form @submit.prevent="handleSubmitNewPassword">
        <AZInputGroup
            type="password" 
            v-model="currentPassword" 
            id="currentPassword" 
            labelText="Current Password: " 
            :handleBlur="v.currentPassword.$touch" 
            :isInvalid="v.currentPassword.$error"
            :disabled="loading" />
        <AZErrorBlock v-for="error of v.currentPassword?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <AZInputGroup 
            type="password"
            v-model="newPassword" 
            id="newPassword" 
            labelText="New Password: " 
            :handleBlur="v.newPassword.$touch" 
            :isInvalid="v.newPassword.$error"
            :disabled="loading" />
        <AZErrorBlock v-for="error of v.newPassword?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <AZInputGroup 
            type="password"
            v-model="newConfirmPassword" 
            id="updateConfirmPassword" 
            labelText="Confirm New Password: " 
            :handleBlur="v.newConfirmPassword.$touch" 
            :isInvalid="v.newConfirmPassword.$error"
            :disabled="loading" />
        <AZErrorBlock v-for="error of v.newConfirmPassword?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <template v-if="!loading">
            <button class="btn btn-danger my-2 w-100" type="submit" :disabled="v.$invalid">Change Password</button>
            <button class="btn btn btn-outline-info my-2 w-100" type="button" @click="handleBackToAccounts">Back to Accounts</button>
        </template>
        <ProfileFeedback :loading="loading" :error="error" :success="success" />
    </form>
</template>

<script>
    import { computed, ref } from "vue"
    import useChangeCredentials from "../../composables/useChangeCredentials"
    import reauthenticateWithEmailAndPassword from "../../firebase/reauthenticateWithEmailAndPassword"
    import ProfileFeedback from "./ProfileFeedback.vue"
    import { useVuelidate } from '@vuelidate/core'
    import { minLength, maxLength, required } from '@vuelidate/validators'
    import AZErrorBlock from "../utility/AZErrorBlock.vue"
    import AZInputGroup from "../utility/AZInputGroup.vue"
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

        const rules = computed(() => ({
            currentPassword: { required },
            newPassword: { required, minLength: minLength(8), maxLength: maxLength(15), },
            newConfirmPassword: { required, minLength: minLength(8), maxLength: maxLength(15), }
        }))

        const v = useVuelidate(rules, { currentPassword, newPassword, newConfirmPassword })

        const handleSubmitNewPassword = async () => {
            if (v.value.$invalid) {
                return error.value = "Please fill out all required fields."
            }
            if (newPassword.value !== newConfirmPassword.value) {
                return error.value = "New and Confirm passwords must be matching.";
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
                v.value.$reset()
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
            v,
            handleBackToAccounts,
            loading,
            error,
            success,
            handleSubmitNewPassword
        };
    },
    components: { ProfileFeedback, AZErrorBlock, AZInputGroup }
}
</script>

<style scoped>
    .password-wrapper {
        max-width: 490px;
    }
</style>
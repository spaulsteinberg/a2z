<template>
    <form @submit.prevent="handleSubmitEmail">
        <AZInputGroup 
            id="updateEmail" 
            type="email"
            labelText="Email:" 
            v-model="newEmail" 
            :handleBlur="v.newEmail.$touch"
            :isInvalid="v.newEmail.$error"
            :hasMargin="false" />
        <AZErrorBlock v-for="error of v.newEmail?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <AZInputGroup 
            id="reenterPassword" 
            type="password" 
            labelText="Please re-enter you password:"
            v-model="reenterPassword"
            :handleBlur="v.reenterPassword.$touch"
            :isInvalid="v.reenterPassword.$error" />
        <AZErrorBlock v-for="error of v.reenterPassword?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <template v-if="!loading">
            <button class="btn btn-warning my-2 w-100" type="submit" :disabled="v.$invalid">Submit</button>
            <button class="btn btn btn-outline-info my-2 w-100" type="button" @click="handleBackToAccounts">Back to Accounts</button>
        </template>
        <ProfileFeedback :loading="loading" :error="error" :success="success" />
    </form>
</template>

<script>
    import { computed, ref } from "vue"
    import reauthenticateWithEmailAndPassword from "../../firebase/reauthenticateWithEmailAndPassword"
    import useChangeCredentials from "../../composables/useChangeCredentials";
    import ProfileFeedback from "./ProfileFeedback.vue";
    import { useVuelidate } from '@vuelidate/core'
    import { required, email } from '@vuelidate/validators'
    import AZInputGroup from "../utility/AZInputGroup.vue";
    import AZErrorBlock from "../utility/AZErrorBlock.vue";
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

        const rules = computed(() => ({
            newEmail: { required, email },
            reenterPassword: { required }
        }))

        const v = useVuelidate(rules, { newEmail, reenterPassword })

        const handleSubmitEmail = async () => {
            if (v.value.$invalid) {
                return error.value = "Please fill out all required fields."
            }
            loading.value = true;
            error.value = "";
            success.value = ""
            try {
                await reauthenticateWithEmailAndPassword(props.currentEmail, reenterPassword.value);
                await props.store.dispatch("auth/updateEmail", { newEmail: newEmail.value });
                success.value = `Successfully changed email to ${newEmail.value}`
                reenterPassword.value = ''
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
            newEmail,
            reenterPassword,
            v,
            loading, 
            success,
            error,
            handleBackToAccounts,
            handleSubmitEmail
        };
    },
    components: { ProfileFeedback, AZInputGroup, AZErrorBlock }
}
</script>
<template>
    <div class="my-2 text-center" v-if="loading">
        <AZLoadingSpinner spinnerColor="primary" />
    </div>
    <div v-if="error">
        <AZFeedbackAlert :text="error" severity="danger" :centered="true" />
    </div>
    <div v-if="success">
        <AZFeedbackAlert :text="success" severity="primary" :centered="true" />
    </div>
</template>

<script>
    import AZLoadingSpinner from "../utility/AZLoadingSpinner.vue"
    import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue"

    export default {
    name: "ProfileFeedback",
    props: {
        loading: {
            type: Boolean,
            default: false,
            required: true
        },
        error: {
            type: String,
            default: "",
            required: true
        },
        success: {
            type: String,
            default: "",
            required: true
        }
    },
    setup() {},
    components: { AZLoadingSpinner, AZFeedbackAlert }
}
</script>

<style scoped>
</style>
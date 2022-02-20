<template>
    <div class="feedback-wrapper">
        <AZFeedbackAlert :text="error" severity="danger" centered />
    </div>
</template>

<script>
    import AZFeedbackAlert from "../../utility/AZFeedbackAlert.vue";
    export default {
        name: 'BasicInfoError',
        components: { AZFeedbackAlert },
        props: {
            error: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>
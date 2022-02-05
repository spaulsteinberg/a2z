<template>
    <div class="feedback-wrapper" v-if="loading">
        <AZFeedbackAlert :text="loadingText" centered includeSpinner />
    </div>
    <div class="feedback-wrapper" v-else-if="error">
        <AZFeedbackAlert :text="error" severity="danger" centered />
    </div>
</template>

<script>
    import { ref } from 'vue'
    import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue";
    export default {
    name: "MapFeedback",
    components: { AZFeedbackAlert },
    props: {
        loading: Boolean,
        error: String
    },
    setup() {
        const loadingText = ref("Loading Maps...")
        return {
            loadingText
        }
    },
    
}
</script>

<style></style>
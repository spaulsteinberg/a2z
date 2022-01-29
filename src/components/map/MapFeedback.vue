<template>
    <div class="feedback-wrapper" v-if="loading">
        <FeedbackAlert :text="loadingText" centered includeSpinner />
    </div>
    <div class="feedback-wrapper" v-else-if="error">
        <FeedbackAlert :text="errorText" centered />
    </div>
</template>

<script>
    import { ref } from 'vue'
    import FeedbackAlert from "../utility/FeedbackAlert.vue";
    export default {
    name: "MapFeedback",
    components: { FeedbackAlert },
    props: {
        loading: Boolean,
        error: Boolean
    },
    setup(props) {
        console.log(props.loading, props.error)
        const loadingText = ref("Loading Maps..."),
              errorText = ref("An error occurred loading the map. You can still search in the sidebar.")
        return {
            loadingText,
            errorText
        }
    },
    
}
</script>

<style></style>
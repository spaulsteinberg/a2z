<template>
    <div class="align-self-center">
        <AZFeedbackAlert text="See map box for error details." severity="danger" centered />
    </div>
</template>

<script>
import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue";
export default {
    name: "SideDrawerMapError",
    components: { AZFeedbackAlert }
}
</script>

<style scoped>
</style>
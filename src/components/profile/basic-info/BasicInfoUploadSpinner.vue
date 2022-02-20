<template>
    <div class="profile-load-spinner-container my-3">
        <AZLoadingSpinner spinnerColor="primary" />
    </div>
</template>

<script>
import AZLoadingSpinner from "../../utility/AZLoadingSpinner.vue";
    export default {
        name: 'BasicInfoUploadSpinner',
        components: { AZLoadingSpinner }
    }
</script>

<style scoped>
.profile-load-spinner-container {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    max-height: 100px;
}

</style>
<template>
    <div class="spinner-vertical-center">
        <AZLoadingSpinner />
    </div>
</template>

<script>
import AZLoadingSpinner from "../utility/AZLoadingSpinner.vue";
export default {
    name: "SideDrawerMapError",
    components: { AZLoadingSpinner }
}
</script>

<style scoped>
  .spinner-vertical-center {
    display: flex;
    align-items: center;
  }
</style>
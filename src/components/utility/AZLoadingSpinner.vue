<template>
    <div :class="['spinner-border', `text-${spinnerColor}`]" role="status"></div>
    {{text}}
</template>

<script>
    export default {
        name: 'AZLoadingSpinner',
        props: {
            spinnerColor: {
                type: String,
                default: 'primary',
                required: false
            },
            text: {
                type: String,
                required: false
            }
        },
        setup(){}
    }
</script>

<style></style>
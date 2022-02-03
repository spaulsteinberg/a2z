<template>
    <div class="text-center text-danger" v-if="error">{{error}}</div>
</template>

<script>
    export default {
        name: 'AZErrorBlock',
        props: {
            error: {
                type: String,
                required: true
            }
        },
        setup(){}
    }
</script>

<style></style>
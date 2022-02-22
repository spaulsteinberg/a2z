<template>
    <div :class="['text-danger', alignText]" v-if="error">
        <small v-if="isSmall">{{error}}</small>
        <span v-else>{{error}}</span>
    </div>
</template>

<script>
    export default {
        name: 'AZErrorBlock',
        props: {
            error: {
                type: String,
                required: true
            },
            isSmall: {
                type: Boolean,
                required: false,
                default: false
            },
            alignText: {
                type: String,
                required: false,
                default: 'text-center'
            }
        },
        setup(){}
    }
</script>

<style></style>
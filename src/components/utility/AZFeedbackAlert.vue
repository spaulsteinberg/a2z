<template>
    <div :class="['alert', severity && `alert-${severity}`, centered && 'centered', textAlign && `text-${textAlign}`]" role="alert">
        <div :class="['spinner-border spinner-border-sm mx-2', `text-${spinnerColor}`]" role="status" v-if="includeSpinner"></div>
        {{ text }}
    </div>
</template>

<script>
    export default {
        name: 'AZFeedbackAlert',
        props: {
            text: {
                type: String,
                default: '',
                required: true
            },
            severity: {
                type: String,
                default: 'primary',
                required: false
            },
            centered: {
                type: Boolean,
                default: false,
                required: false
            },
            textAlign: {
                type: String,
                default: 'center',
                required: false
            },
            includeSpinner: {
                type: Boolean,
                default: false,
                required: false
            },
            spinnerColor: {
                type: String,
                default: 'primary',
                required: false
            }
        },
        setup(){

        }
    }
</script>

<style scoped>
    .centered {
        margin: 0 auto;
    }
</style>
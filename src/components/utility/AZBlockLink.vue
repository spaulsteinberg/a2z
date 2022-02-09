<template>
    <div class="az-block">
        <div class="az-block-content">

        </div>
        <div class="az-icon"></div>
    </div>
</template>

<script>
    export default {
        name: 'AZBlockLink',
        props: {
            linkText: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            icon: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        setup(){

        }
    }
</script>

<style scoped>
    .az-block {
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: gray;
    }
</style>
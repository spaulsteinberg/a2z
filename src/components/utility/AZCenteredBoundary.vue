<template>
    <div class="text-center or-container">
        <hr class="or-hr" />
        <span class="or-span">{{text}}</span>
        <hr class="or-hr" />
    </div>
</template>

<script>
    export default {
        name: 'AZCenteredBoundary',
        setup(){},
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .or-container {
        display: flex;
        flex-direction: row;
    }

    .or-hr {
        flex: 1 1 0%;
    }

    .or-span {
        flex: .3 1 0%;
        margin-top: 2px;
    }
</style>
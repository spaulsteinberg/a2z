<template>
    <div class="card">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AZCard',
        setup(){

        }
    }
</script>

<style scoped>

</style>
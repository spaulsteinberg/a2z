<template>
    <div class="accordion" :id="id">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'AZAccordion',
        props: {
            id: {
                type: String,
                required: true
            }
        }
    }
</script>
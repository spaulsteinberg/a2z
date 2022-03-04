<template>
    <div class="dialog-info-row px-1">
        <div class="my-1">{{ rowOne }}</div>
        <div class="my-1">{{ rowTwo }}</div>
        <div class="my-1">{{ rowThree }}</div>
    </div>
</template>

<script>
import { computed } from "vue"

export default {
    name: 'TicketInfoRow',
    props: {
        titleFirst: String,
        itemFirst: String,
        titleSecond: String,
        itemSecond: String,
        titleThird: String,
        itemThird:String
    },
    setup(props){
        const rowOne = computed(() => `${props.titleFirst}: ${props.itemFirst} `)
        const rowTwo = computed(() => `${props.titleSecond}: ${props.itemSecond} `)
        const rowThree = computed(() => `${props.titleThird}: ${props.itemThird} `)
        return { rowOne, rowTwo, rowThree }
    }
}
</script>

<style scoped></style>
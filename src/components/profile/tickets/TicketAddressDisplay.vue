<template>
    <div class="dialog-modal-address mb-3">
        <div>{{ start }}</div>
        <div class="my-3">to</div>
        <div>{{ destination }}</div>
    </div>
</template>

<script>
export default {
    name: 'TicketAddressDisplay',
    props: {
        start: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.dialog-modal-address {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    color: black;
    font-size: 18px;
}
</style>
<template>
    <el-dialog
        :title="title"
        :width="mobile && !desktop ? '50%' : desktop ? '30%' : '95%'"
        v-model="show"
        :before-close="handleClose"
    >
        <TicketDisplay :ticket="ticket" v-if="!editing" />
        <template v-slot:footer>
            <div class="button-container">
                <button class="btn btn-info mx-1">Edit</button>
                <button class="btn btn-danger mx-1"> Delete</button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import { computed, ref } from 'vue'
import useWindowWidth from '../../../composables/useWindowWidth'
import TicketDisplay from './TicketDisplay.vue'

export default {
    name: 'ViewTicketModal',
    components: { ElDialog, TicketDisplay },
    props: {
        ticket: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {
        const show = ref(true)
        const title = computed(() => `Ticket: ${props.ticket.ticketId}`)
        const mobile = useWindowWidth(500).isWidth
        const desktop = useWindowWidth(1200).isWidth
        const editing = ref(false)
        console.log("Opening...", props.ticket)
        const handleClose = () => {
            console.log("Closing...")
            context.emit("closeModal")
        }

        return {
            show,
            title,
            mobile,
            desktop,
            editing,
            handleClose
        }
    },
    emits: ["closeModal"]
}
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
}
</style>
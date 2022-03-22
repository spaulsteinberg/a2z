<template>
    <el-dialog
        :title="title"
        :width="mobile && !desktop ? '55%' : desktop ? '30%' : '95%'"
        v-model="show"
        :before-close="handleClose"
    >
        <TicketAddressDisplay :start="ticket.start_address" :destination="ticket.destination_address" />
        <TicketDisplay :ticket="ticket" v-if="!editing" />
        <form @submit.prevent="handleSubmitForm" v-else>
            <AZInputGroup type="number" v-model="basePay" id="basePay" labelText="Base Pay: " :handleBlur="v.basePay.$touch" :isInvalid="v.basePay.$error" />
            <AZErrorBlock v-for="error of v.basePay?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            <AZInputGroup type="number" v-model="ratePerMile" id="ratePerMile" labelText="Rate/Mile: " step="any" :handleBlur="v.ratePerMile.$touch" :isInvalid="v.ratePerMile.$error" />
            <AZErrorBlock v-for="error of v.ratePerMile?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            <AZTextarea v-model="description" id="description" labelText="Description: " :handleBlur="v.description.$touch" :isInvalid="v.description.$error" />
            <AZErrorBlock v-for="error of v.description?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            <AZSelectGroup v-model="hasStatus" :items="selectItems" id="hasStatusSelect" labelText="Status: " :isInvalid="v.hasStatus.$error" />
            <AZErrorBlock v-for="error of v.hasStatus?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            <p class="mt-2">New Total: ${{ total }}</p>
        </form>
        <template v-slot:footer >
            <div class="button-container">
                <template v-if="!loading && !viewOnly">
                    <button class="btn btn-info mx-1" @click="handleChangeEdit" v-if="!editing">Edit</button>
                    <template v-else>
                        <button class="btn btn-primary mx-1" @click="handleSubmitForm" :disabled="v.$invalid">Save Changes</button>
                        <button class="btn btn-secondary mx-1" @click="cancelForm">Cancel</button>
                    </template>
                </template>
                <template v-if="ticket.hasStatus === cancelledStatus">
                    <button class="btn btn-primary" @click="handleChangeTicketStatus(openTicketStatus)" v-if="!rOpenLoading">Re-Open Ticket</button>
                    <AZLoadingSpinner v-else />
                </template>
                <template v-if="ticket.hasStatus === inProgressStatus">
                    <button class="btn btn-success" @click="handleChangeTicketStatus(completedTicketStatus)" v-if="!rOpenLoading">Mark as Complete</button>
                    <AZLoadingSpinner v-else />
                </template>
                <AZLoadingSpinner v-if="loading"/>
            </div>
            <div class="mt-4" v-if="error">
                <AZFeedbackAlert :text="error" severity="danger" />
            </div>
            <div class="mt-4" v-if="rOpenError">
                <AZFeedbackAlert :text="rOpenError" severity="danger" />
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import { computed, reactive, ref, toRefs } from 'vue'
import useWindowWidth from '../../../composables/useWindowWidth'
import TicketDisplay from './TicketDisplay.vue'
import TicketAddressDisplay from './TicketAddressDisplay.vue'
import AZInputGroup from '../../utility/AZInputGroup.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxValue, minValue, minLength, maxLength } from '@vuelidate/validators'
import AZSelectGroup from '../../utility/AZSelectGroup.vue'
import TicketStatus from '../../../constants/TicketStatus'
import AZTextarea from '../../utility/AZTextarea.vue'
import AZErrorBlock from '../../utility/AZErrorBlock.vue'
import { getAuth } from 'firebase/auth'
import { useStore } from 'vuex'
import AZLoadingSpinner from '../../utility/AZLoadingSpinner.vue'
import AZFeedbackAlert from '../../utility/AZFeedbackAlert.vue'

export default {
    name: 'ViewTicketModal',
    components: { ElDialog, TicketDisplay, TicketAddressDisplay, AZInputGroup, AZSelectGroup, AZTextarea, AZErrorBlock, AZLoadingSpinner, AZFeedbackAlert },
    props: {
        ticket: {
            type: Object,
            required: true
        },
        ticketIndex: {
            type: Number,
            required: false
        },
        viewOnly: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props, context) {
        const show = ref(true)
        const title = computed(() => `Ticket: ${props.ticket.ticketId}`)
        const mobile = useWindowWidth(500).isWidth
        const desktop = useWindowWidth(1200).isWidth
        const editing = ref(false)
        const auth = getAuth()
        const store = useStore()
        const handleClose = () => {
            console.log("Closing...")
            context.emit("closeModal")
        }
        console.log("props...", props)
        const handleChangeEdit = () => editing.value = !editing.value

        /********* form refs  ***************/
        const editForm = reactive({
            basePay: props.ticket.base_pay,
            ratePerMile: props.ticket.rate_per_mile,
            hasStatus: props.ticket.hasStatus,
            description: props.ticket.description
        })

        const reqState = reactive({
            loading: false,
            error: null
        })

        const reOpenReqState = reactive({
            rOpenLoading: false,
            rOpenError: null
        })
        
        const selectItems = [TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.COMPLETED, TicketStatus.CANCELLED]
        const rules = computed(() => ({
            basePay: { required, minValue: minValue(0), maxValue: maxValue(1000000) },
            ratePerMile: { required, minValue: minValue(0.0), maxValue: maxValue(1000000) },
            hasStatus: { required },
            description: { required, minLength: minLength(15), maxLength: maxLength(300) }
        }))
        const total = computed(() => parseFloat(parseFloat(editForm.basePay) + (editForm.ratePerMile * props.ticket.distance)).toFixed(2))

        const v = useVuelidate(rules, editForm)

        const handleSubmitForm = async () => {
            try {
                const request = {
                    ticketId: props.ticket.ticketId,
                    basePay: parseFloat(editForm.basePay),
                    ratePerMile: parseFloat(parseFloat(editForm.ratePerMile).toFixed(2)),
                    hasStatus: editForm.hasStatus,
                    description: editForm.description,
                    total: parseFloat(total.value)
                }
                reqState.loading = true
                reqState.error = null
                await store.dispatch("ticket/patchTicket", { user: auth.currentUser, index: props.ticketIndex ? props.ticketIndex : -1, request})
                handleChangeEdit()
            } catch (err) {
                console.log(err)
                reqState.error = "Could not edit ticket."
            } finally { reqState.loading = false }
        }

        const cancelForm = () => {
            console.log("cancelling...")
            editForm.basePay = props.ticket.base_pay
            editForm.ratePerMile = props.ticket.rate_per_mile
            editForm.hasStatus = props.ticket.hasStatus
            editForm.description = props.ticket.description
            reqState.loading = false
            reqState.error = null
            reOpenReqState.rOpenLoading = false
            reOpenReqState.rOpenError = null
            handleChangeEdit()
        }

        const handleChangeTicketStatus = async (status) => {
            try {
                reOpenReqState.rOpenLoading = true
                reOpenReqState.rOpenError = null
                await store.dispatch("ticket/changeTicketStatus", { user: auth.currentUser, ticketId: props.ticket.ticketId, newStatus: status})
            } catch (err) {
                console.log(err.message)
                reOpenReqState.rOpenError = "Could not update status."
            } finally { reOpenReqState.rOpenLoading = false }
        }

        return {
            show,
            title,
            mobile,
            desktop,
            editing,
            handleChangeEdit,
            handleClose,
            v,
            ...toRefs(editForm),
            ...toRefs(reqState),
            ...toRefs(reOpenReqState),
            total,
            selectItems,
            cancelForm,
            handleSubmitForm,
            handleChangeTicketStatus,
            completedTicketStatus: TicketStatus.COMPLETED,
            openTicketStatus: TicketStatus.OPEN,
            cancelledStatus: TicketStatus.CANCELLED,
            inProgressStatus: TicketStatus.IN_PROGRESS
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
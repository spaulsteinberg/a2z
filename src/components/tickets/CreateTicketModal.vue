<template>
    <ElDialog
        title="Create Ticket"
        v-model="show"
        :width="isLargerScreen && !isDesktop ? '60%' : isDesktop ? '30%' : '95%'"
        :before-close="handleClose"
    >
        <p>{{ data.address.start + " to " + data.address.end}}</p>
        <p>Distance: {{ data.distanceText }}</p>
        <p>Duration: {{ data.duration }}</p>
        <div class="input-create-container">
            <div class="create-ticket-input">
                <AZInputGroup type="number" v-model="basePay" id="basePay" labelText="Base Pay: " :handleBlur="v.basePay.$touch" :isInvalid="v.basePay.$error" :disabled="loading" alignInput="text-end"/>
                <AZErrorBlock v-for="error of v.basePay?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            </div>
            <div class="create-ticket-input-sm">
                <AZInputGroup type="number" v-model="ratePerMile" id="ratePerMile" labelText="Rate/Mile: " step="any" :handleBlur="v.ratePerMile.$touch" :isInvalid="v.ratePerMile.$error" :disabled="loading" alignInput="text-end" />
                <AZErrorBlock v-for="error of v.ratePerMile?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            </div>
        </div>
        <AZTextarea v-model="description" id="description" labelText="Description: " :handleBlur="v.description.$touch" :isInvalid="v.description.$error" :disabled="loading" />
        <AZErrorBlock v-for="error of v.description?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        <p>Total: {{ total }}</p>
        <template #footer>
            <div class="text-center">
                <template v-if="!loading">
                    <button class="btn btn-secondary mx-1" @click="handleClose">Cancel</button>
                    <button class="btn btn-primary mx-1" @click="handleCreateTicket" :disabled="v.$invalid">Create</button>
                </template>
                <AZLoadingSpinner v-else />
                <div class="mt-2" v-if="error || success">
                    <AZFeedbackAlert :text="error" severity="danger" centered v-if="error"/>
                    <AZFeedbackAlert :text="success" severity="success" centered v-if="success"/>
                </div>
            </div>
        </template>    
    </ElDialog>
</template>

<script>
import { ElDialog } from "element-plus"
import { AZInputGroup, AZErrorBlock, AZTextarea, AZLoadingSpinner, AZFeedbackAlert } from "../utility"
import { computed, reactive, ref, toRefs } from "vue"
import { useVuelidate } from '@vuelidate/core'
import { required, maxValue, minValue, minLength, maxLength } from '@vuelidate/validators'
import useWindowWidth from '../../composables/useWindowWidth'
import { useStore } from "vuex"
import { getAuth } from "firebase/auth"
import TicketStatus from "../../constants/TicketStatus"

export default {
    name: 'CreateTicketModal',
    components: { ElDialog, AZInputGroup, AZErrorBlock, AZTextarea, AZLoadingSpinner, AZFeedbackAlert },
    props: {
        data: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    setup(props, context){
        const store = useStore()
        const auth = getAuth()
        const show = ref(true)
        const isLargerScreen = useWindowWidth(500).isWidth
        const isDesktop = useWindowWidth(992).isWidth
        const ticketForm = reactive({
            basePay: 0,
            ratePerMile: 0.00,
            description: ''
        })

        const requestState = reactive({
            loading: false,
            success: '',
            error: ''
        })
        
        const total = computed(() => parseFloat(parseFloat(ticketForm.basePay) + (props.data.distance * ticketForm.ratePerMile)).toFixed(2))

        const rules = computed(() => ({
            basePay: { required, minValue: minValue(0), maxValue: maxValue(1000000) },
            ratePerMile: { required, minValue: minValue(0.0), maxValue: maxValue(1000000) },
            description: { required, minLength: minLength(15), maxLength: maxLength(300) }
        }))

        const v = useVuelidate(rules, ticketForm)

        const resetRequestStates = (loading = false, success = '', error = '') => {
            requestState.loading = loading
            requestState.success = success
            requestState.error = error
        }

        const handleClose = () => {
            resetRequestStates()
            context.emit("closeModal")
        }

        const handleCreateTicket = async () => {
            try {
                if (v.value.$invalid) {
                    return requestState.error = "Please fill out all required fields."
                }
                resetRequestStates(true)
                const tempStartCityState = props.data.address.start.split(",")
                const tempEndCityState = props.data.address.end.split(",")
                const request = {
                    start_address: props.data.address.start,
                    destination_address: props.data.address.end,
                    start_city_state: `${tempStartCityState[1]},${tempStartCityState[2].substring(0, 3)}`.trim(),
                    end_city_state: `${tempEndCityState[1]},${tempEndCityState[2].substring(0, 3)}`.trim(),
                    distance: props.data.distance,
                    distance_formatted: props.data.distanceText,
                    est_duration: props.data.duration,
                    base_pay: ticketForm.basePay * 1,
                    rate_per_mile: ticketForm.ratePerMile * 1,
                    total: total.value * 1,
                    description: ticketForm.description,
                    places: {
                        start: props.data.waypoints[0],
                        end: props.data.waypoints[1]
                    },
                    hasStatus: TicketStatus.OPEN
                }
                console.log(request)
                await store.dispatch("ticket/postTicket", { user: auth.currentUser, request: request })
                requestState.success = "Ticket Created!"
            } catch (err) {
                console.log(err)
                requestState.error = "Something went wrong creating ticket."
            } finally {
                requestState.loading = false
            }
        }

        return {
            show, handleCreateTicket, handleClose, ...toRefs(ticketForm), ...toRefs(requestState), total, isLargerScreen, isDesktop, v
        }
    },
    emits: ["closeModal"]
}
</script>

<style scoped>
    .input-create-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .create-ticket-input {
        flex: 0 0 100%;
        width: 100%;
        max-width: 200px;
    }
    .create-ticket-input-sm {
        width: 20%;
        min-width: 70px;
        max-width: 70px;
        margin-left: 0;
    }

    @media screen and (min-width: 500px) {
        .input-create-container {
            flex-direction: row;
        }
        .create-ticket-input {
            flex: 0 0 48%;
            width: 48%;
        }
        .create-ticket-input-sm {
            margin-left: 2rem;
        }
    }

</style>
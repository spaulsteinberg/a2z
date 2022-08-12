<template>
    <el-dialog
        :title="title"
        v-model="open"
        :width="isMobile && !isDesktop ? '70%' : isDesktop ? '50%' : '95%'"
        :before-close="handleClose"
        center
    >
    <div class="text-center mb-3">
        <p class="info-text my-1">
            When you are ready to accept a request, please note that all other requests will be rejected automatically.
        </p>
        <template v-if="!cLoading">
            <button class="btn btn-info mx-auto" @click="handleSetRequestCloseStatus(false)" v-if="requestClosed">Re-Open Applications</button>
            <button class="btn btn-warning mx-auto" @click="handleSetRequestCloseStatus(true)" v-else>Close Applications</button>
        </template>
        <AZLoadingSpinner :spinnerColor="requestClosed ? 'info' : 'warning'" v-else />
        <p class="text-danger" v-if="cError">Could not submit your request at this time.</p>
    </div>
    <AZAccordion :id="accordionId">
        <AZAccordionItem v-for="(uid, i) of data.uids" :key="uid" :title="data.uid[uid].name" :parent="accordionParentId" :headerId="i.toString()" :forTarget="`#${uid}`" :forId="uid">
            <template v-slot:body>
                <div class="accordianItemBody">
                    <img class="img-fluid rounded me-2 my-3 img-container" :src="data.uid[uid].photo ? data.uid[uid].photo : require('../../assets/person-outline.png')" />
                    <div class="info-container">
                        <p>Email: {{data.uid[uid].email}}</p>
                        <div class="status-container">
                            <div class="status-text">Status: {{ data.uid[uid].status }}</div>
                            <ActionIcon variant="clock" fill="blue" v-if="data.uid[uid].status === REQ_STATUS.WAITING"/>
                            <ActionIcon variant="check" fill="green" v-else-if="data.uid[uid].status === REQ_STATUS.ACCEPTED" />
                            <ActionIcon variant="x" fill="red" v-else />
                        </div>
                    </div>
                </div>
                <div class="text-center mt-3" v-if="data.uid[uid].status === REQ_STATUS.WAITING">
                    <AZLoadingSpinner spinnerColor="danger" v-if="rLoading" />
                    <template v-else>
                        <button class="btn btn-primary mx-2">Accept</button>
                        <button class="btn btn-danger mx-2" @click="handleRejectRequest(uid)">Reject</button>
                    </template>
                </div>
            </template>
        </AZAccordionItem>
    </AZAccordion>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import useWindowWidth from '../../composables/useWindowWidth'
import { AZAccordion, AZAccordionItem } from '../utility/'
import ActionIcon from '../icons/ActionIcon.vue'
import { getAuth } from '@firebase/auth'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import RequestStatus from '../../constants/RequestStatus'
import AZLoadingSpinner from '../utility/AZLoadingSpinner.vue'

export default {
    name: 'RequestModal',
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    setup(props, context){
        const isMobile = useWindowWidth(500).isWidth
        const isDesktop = useWindowWidth(992).isWidth
        const auth = getAuth()
        const { dispatch, getters } = useStore()
        const open = true
        const REQ_STATUS = {
            WAITING: RequestStatus.WAITING,
            ACCEPTED: RequestStatus.ACCEPTED
        }
        const title = `View Request ${props.data.id}`

        const closeStatus = reactive({
            cLoading: false,
            cError: false
        })

        const rejectStatus = reactive({
            rLoading: false,
            rError: false
        })

        const requestClosed = computed(() => getters["request/getClosedStatusById"](props.data.id))
        const handleClose = () => context.emit("closeModal")

        const handleSetRequestCloseStatus = async (closed) => {
            closeStatus.cLoading = true
            closeStatus.cError = false
            await dispatch("request/postClosedStatus", { 
                user: auth.currentUser, 
                id: props.data.id, 
                closed 
            })
            .catch(err => { console.log(err); closeStatus.cError = true })
            .finally(() => closeStatus.cLoading = false)
        }
        const handleRejectRequest = async (uid) => {
            rejectStatus.rLoading = true
            rejectStatus.rError = false
            await dispatch("request/postRejectStatus", {
                user: auth.currentUser,
                id: props.data.id,
                uid
            })
            .catch(err => { console.log(err); rejectStatus.rError = true })
            .finally(() => rejectStatus.rLoading = false)
        }
        return {
            isMobile,
            isDesktop,
            open,
            title,
            handleClose,
            accordionId: "accountAccordion",
            accordionParentId: "#accountAccordion",
            handleSetRequestCloseStatus,
            requestClosed,
            REQ_STATUS,
            handleRejectRequest,
            ...toRefs(closeStatus),
            ...toRefs(rejectStatus)
        }
    },
    emits: ["closeModal"],
    components: { ElDialog, AZAccordion, AZAccordionItem, ActionIcon, AZLoadingSpinner }
}
</script>

<style scoped>
    .img-container {
        max-width: 100%;
        min-height: 100px;
        max-height: 200px;
        width: 200px;
    }

    .info-container {
        width: 100%;
        margin-top: 2rem;
    }

    .info-text {
        word-break: break-word;
    }

    .status-container {
        display: flex;
        align-items: center;
    }

    .status-text {
        margin-right: .5rem;
    }

    .accordianItemBody {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    @media screen and (min-width: 500px) {
        .info-container {
            width: calc(95% - 100px);
        }
        .img-container {
            width: 100px;
            margin-top: 0;
        }
        .accordianItemBody {
            flex-direction: row;
            align-items: center;
        }
    }
</style>
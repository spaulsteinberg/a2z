<template>
    <el-dialog
        :title="title"
        v-model="show"
        :width="isLargerScreen && !isDesktop ? '60%' : isDesktop ? '30%' : '95%'"
        :before-close="handleClose"
    >
        <div v-html="body" class="body-class"></div>
        <template #footer>
            <div class="text-center">
                <template v-if="!isLoading">
                    <button class="btn btn-secondary mx-1" @click="handleClose">Cancel</button>
                    <button class="btn btn-danger mx-1" @click="handleConfirm">Confirm</button>
                </template>
                <AZLoadingSpinner v-else />
                <div class="mt-2" v-if="error">
                    <AZFeedbackAlert :text="error" severity="danger" centered  />
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import { ref } from 'vue'
import useWindowWidth from '../../composables/useWindowWidth'
import { AZLoadingSpinner, AZFeedbackAlert } from '../utility'
export default {
    name: 'AZCCModal',
    components: {
    ElDialog,
    AZLoadingSpinner,
    AZFeedbackAlert
},
    props: {
        title: {
            type: String,
            required: false,
            default: ""
        },
        body: {
            type: String,
            required: false,
            default: ""
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false
        },
        error: {
            type: String,
            required: false
        }
    },
    setup(_, context){
        const show = ref(true)
        const isLargerScreen = useWindowWidth(500).isWidth
        const isDesktop = useWindowWidth(992).isWidth
        const handleClose = () => context.emit("closeModal")

        const handleConfirm = () => context.emit("handleConfirm")

        return {
            show, handleClose, handleConfirm, isLargerScreen, isDesktop
        }
    },
    emits: ["closeModal", "handleConfirm"]
}
</script>

<style scoped>
    .body-class {
        word-break: break-word;
    }
</style>
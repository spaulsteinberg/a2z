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
                <button class="btn btn-secondary mx-1" @click="handleClose">Cancel</button>
                <button class="btn btn-danger mx-1" @click="handleConfirm">Confirm</button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import { ref } from 'vue'
import useWindowWidth from '../../composables/useWindowWidth'
export default {
    name: 'AZCCModal',
    components: {
        ElDialog
    },
    props: {
        title: String,
        body: String
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
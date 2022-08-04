<template>
    <el-dialog
        :title="title"
        v-model="open"
        :width="isMobile && !isDesktop ? '55%' : isDesktop ? '30%' : '95%'"
        :before-close="handleClose"
    >
    <div>{{data.id}}</div>
    </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import useWindowWidth from '../../composables/useWindowWidth'

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
        const open = true
        const title = "View Request"
        const handleClose = () => context.emit("closeModal")
        return {
            isMobile,
            isDesktop,
            open,
            title,
            handleClose
        }
    },
    emits: ["closeModal"],
    components: { ElDialog }
}
</script>

<style scoped>

</style>
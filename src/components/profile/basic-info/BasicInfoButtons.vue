<template>
    <div class="button-wrappers">
        <AZLoadingSpinner spinnerColor="primary" v-if="reqLoading" />
        <template v-else>
            <button class="btn btn-warning mt-1" @click="handleEditClick(true)" v-if="!isEditable">Edit</button>
            <template v-else>
                <button class="btn btn-primary mx-1 mt-1" @click="submitInfo">Save Changes</button>
                <button class="btn btn-outline-danger mx-1 mt-1" @click="handleEditClick(false)">Cancel</button>
            </template>
        </template>
    </div>
</template>

<script>
import AZLoadingSpinner from "../../utility/AZLoadingSpinner.vue";
export default {
    name: 'BasicInfoButtons',
    components: { AZLoadingSpinner },
    props: {
        reqLoading: {
            type: Boolean,
            required: true
        },
        isEditable: {
            type: Boolean,
            required: true
        },
        handleEditClick: {
            type: Function,
            required: true
        },
        submitInfo: {
            type: Function,
            required: true
        }
    },
}
</script>

<style scoped>
</style>
<template>
    <AZInputGroup :id="idTag + '-place'" v-model.trim="location" labelText="Search By Origin" type="text" />
</template>

<script>
import { onUnmounted, ref, watch } from "vue"
import { useStore } from "vuex";
import { AZInputGroup } from "../utility"
export default {
    name: 'TicketOriginSearch',
    components: { AZInputGroup },
    props: {
        isOrigin: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    setup(props){
        const store = useStore()
        const location = ref('');
        const idTag = props.isOrigin ? "origin" : "destination"
        watch(() => location.value, newValue => {
            console.log(newValue)
            store.commit("ticket/setOriginFilterValue", newValue)
        })
        onUnmounted(() => {
            store.commit("ticket/setOriginFilterValue", '')
        })
        return {
            location,
            idTag
        }
    }
}
</script>
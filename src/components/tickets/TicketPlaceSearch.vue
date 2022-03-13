<template>
    <AZInputGroup :id="idTag + '-place'" v-model.trim="location" :labelText="labelText" type="text" />
</template>

<script>
import { onUnmounted, ref, watch } from "vue"
import { useStore } from "vuex";
import { AZInputGroup } from "../utility"
export default {
    name: 'TicketPlaceSearch',
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
        const labelText = `Filter by ${props.isOrigin ? "Origin" : "Destination"}`
        watch(() => location.value, newValue => {
            console.log(newValue)
            if (props.isOrigin) {
                store.commit("ticket/setOriginFilterValue", newValue)
            } else {
                store.commit("ticket/setDestinationFilterValue", newValue)
            }
        })
        onUnmounted(() => {
            store.commit("ticket/setOriginFilterValue", '')
            store.commit("ticket/setDestinationFilterValue", '')
        })
        return {
            location,
            labelText,
            idTag
        }
    }
}
</script>
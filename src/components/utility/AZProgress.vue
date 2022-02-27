<template>
    <div class="progress">
        <div
            :class="['progress-bar', variant, striped && 'progress-bar-striped']"
            role="progressbar"
            :aria-valuenow="value"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="progress"
        >
            <span class="sr-only">{{ value }}%</span>
        </div>
    </div>
</template>

<script>
import { computed } from "vue"

export default {
    name: 'AZProgress',
    props: {
        value: {
            type: Number,
            required: true
        },
        variant: {
            type: String,
            default: 'bg-primary',
            required: false
        },
        striped: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    setup(props){
        const progress = computed(() => { return { width: `${props.value}%`}})
        return { progress }
    }
}
</script>
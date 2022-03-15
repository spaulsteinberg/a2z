<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="w"
        :height="h"
        :fill="fill"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
    >
        <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
    </svg>
</template>

<script>
import useIcon from "../../composables/useIcon"
export default {
    name: 'RightChevronIcon',
    props: {
        height: {
            type: String,
            default: "16",
            required: false
        },
        width: {
            type: String,
            default: "16",
            required: false
        },
        fill: {
            type: String,
            default: "currentColor",
            required: false
        }
    },
    setup(props) {
        const { width, height } = useIcon(props.width, props.height)
        return {
            w: width,
            h: height
        }
    }
}
</script>

<style scoped>
</style>
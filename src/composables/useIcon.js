import { computed } from "vue"

const useIcon = (_width, _height) => {
    const width = computed(() => `${_width}`)
    const height = computed(() => `${_height}`)

    return { width, height }
}

export default useIcon
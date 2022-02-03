import { onMounted, onUnmounted, ref } from "vue"

// returns true if window is greater than the width
const useWindowWidth = (size) => {
    let isWidth = ref(false)

    if(window.matchMedia(`(min-width: ${size}px)`).matches) isWidth.value = true


    let widthCheck = window.matchMedia(`(min-width: ${size}px)`)
    const shouldChangeInputAlignment = e => {
        console.log(isWidth.value, e.matches)
        isWidth.value = e.matches
        console.log(isWidth.value, e.matches)
    }

    onMounted(() => widthCheck.addEventListener("change", shouldChangeInputAlignment, true))
    onUnmounted(() => widthCheck.removeEventListener("change", shouldChangeInputAlignment, true))

    return { isWidth }
}

export default useWindowWidth
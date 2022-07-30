<template>
    <div class="card mb-3">
        <div class="card-body container" @click="handleBoxClick">
            <div class="info-container">
                <div class="mb-1">Ticket ID: {{ notif.id }}</div>
                <div class="mb-1">Number of Requests: {{ notif.requests.length }}</div>
                <div class="mb-1">
                    Status: {{ status }}
                </div>
            </div>
            <div class="arrow-container" v-if="width">
                <button class="btn btn-primary" @click="handleArrowClick">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import useWindowWidth from '../../../composables/useWindowWidth'

export default {
    props: {
        notif: Object
    },
    setup(props, context) {

        const width = useWindowWidth(475).isWidth
        const status = computed(() => {
            if (props.notif.isAccepted && props.notif.isClosed) {
                return "Accepted and Closed"
            } else if (props.notif.isAccepted) {
                return "Accepted"
            } else if (props.notif.isClosed) {
                return "Closed"
            }
            return "Open"
        })

        const handleBoxClick = () => {
            if (width.value) return
            context.emit("viewArrowClick")
        }

        const handleArrowClick = () => context.emit("viewArrowClick")

        return {
            status,
            width,
            handleArrowClick,
            handleBoxClick
        }
    },
    emits: ["viewArrowClick"]
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
}

.info-container {
    width: 100%
}

.arrow-container {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
}

@media screen and (min-width: 475px) {
    .container {
        flex-direction: row;
    }

    .info-container {
        width: 75%
    }

    .arrow-container {
        width: 25%;
        margin-top: 0;
    }
}
</style>
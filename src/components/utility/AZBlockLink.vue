<template>
    <router-link :to="to" class="az-block-link">
        <div class="az-block rounded">
            <div class="az-block-content">
                <span>{{linkText}}</span>
            </div>
            <div class="az-icon" v-if="icon">
                <RightChevronIcon />
            </div>
        </div>
    </router-link>
</template>

<script>
import RightChevronIcon from "../icons/RightChevronIcon.vue";
    export default {
        name: 'AZBlockLink',
        props: {
            linkText: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            icon: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        setup(){},
        components: { RightChevronIcon }
    }
</script>

<style scoped>
    .az-block {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        padding: 0.75rem 1rem .75rem .5rem;
        background-color: #E5E4E2;
    }
    .az-block-link {
        text-decoration: none;
    }
</style>
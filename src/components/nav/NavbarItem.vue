<template>
    <li class="nav-item">
        <router-link :to="to" :class="['navbar-brand', styledBrand && 'styled-brand']">{{linkText}}</router-link>
    </li>
</template>

<script>
    export default {
        name: 'NavbarItem',
        setup(){},
        props: {
            to: {
                type: String,
                required: true,
            },
            linkText: {
                type: String,
                required: true,
                default: 'link'
            },
            styledBrand: {
                type: Boolean,
                default: true,
                required: false
            }
        }
    }
</script>

<style scoped>
</style>
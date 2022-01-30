<template>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarItem v-for="(link, i) in links" :key="link + i" :to="link.to" :linkText="link.text" />
        </ul>
    </div>
</template>

<script>
import NavbarItem from "./NavbarItem.vue";
    export default {
        name: 'NavbarCollapse',
        components: { NavbarItem },
        props: {
            links: {
                type: Array,
                required: true,
                default: () => []
            }
        }
    }
</script>
<style></style>
<template>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarItem v-for="(link, i) in links" :key="link + i" :to="link.to" :linkText="link.text" />
            <template v-if="!isWidth">
                <NavbarItem to="/profile/account" linkText="Account" />
                <li class="nav-item navbar-brand text-white p-0" @click="handleLogout">Logout</li>
            </template>
        </ul>
        <NavProfileDropdown :handleLogout="handleLogout" v-if="isWidth"/>
    </div>
</template>

<script>
    import { useStore } from "vuex";
    import useWindowWidth from "../../composables/useWindowWidth";
    import NavbarItem from "./NavbarItem.vue";
    import NavProfileDropdown from "./NavProfileDropdown.vue";
    import { useRouter } from 'vue-router';
    export default {
        name: 'NavbarCollapse',
        components: { NavbarItem, NavProfileDropdown },
        props: {
            links: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        setup() {
            const { isWidth } = useWindowWidth(992)
            const store = useStore()
            const router = useRouter()

            const handleLogout = async () => {
                await store.dispatch('logout')
                router.push('/login')
            }

            return {
                handleLogout,
                isWidth
            }
        }
    }
</script>
<style>
    .no-decor {
        text-decoration: none;
    }
</style>
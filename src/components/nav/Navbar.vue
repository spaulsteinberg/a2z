<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="main-nav">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand styled-brand">{{appName}}</router-link>
      <NavbarToggler />
      <NavbarCollapse :links="userLinks" :user="user" v-if="user"/>
      <NavbarCollapse :links="nonUserLinks" v-else/>
    </div>
  </nav>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex';
  import NavbarCollapse from './NavbarCollapse.vue';
  import NavbarToggler from './NavbarToggler.vue';
  export default {
    name: "Navbar",
    components: { NavbarCollapse, NavbarToggler },
    setup() {
      const appName = ref('a2z')
      const store = useStore()
      const userLinks = ref([
        { to: '/explore', text: 'Explore'},
      ])
      const nonUserLinks = ref([
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup'}
      ])

      return {
        appName,
        user: computed(() => store.state.auth.user),
        userLinks,
        nonUserLinks
      }
    }
  };
</script>

<style scoped>
  #main-nav {
    background-color: #6610f2 !important;
  }
</style>
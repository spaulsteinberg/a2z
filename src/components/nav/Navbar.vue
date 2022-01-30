<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="main-nav">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand styled-brand">{{appName}}</router-link>
      <NavbarToggler />
      <NavbarCollapse :links="links" />
    </div>
  </nav>
</template>

<script>
  import { ref } from 'vue'
  import NavbarCollapse from './NavbarCollapse.vue';
import NavbarToggler from './NavbarToggler.vue';
  export default {
    name: "Navbar",
    components: { NavbarCollapse, NavbarToggler },
    setup() {
      const appName = ref('a2z')
      const links = ref([{ to: '/explore', text: 'Explore'}, { to: '/profile/account', text: 'Accounts'}])
      return {
        appName,
        links
      }
    }
  };
</script>

<style scoped>
  #main-nav {
    background-color: #6610f2 !important;
  }
</style>
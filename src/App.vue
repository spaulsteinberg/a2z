<template>
  <div id="app">
    <Navbar />
    <div class="row app-root-row g-0">
      <div class="col col-md-12 p-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/nav/Navbar.vue'
  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>
  #app {
    height: 100vh;
  }

  .app-root-row {
    height: calc(100% - 56px);
  }

  /* global nav styles */
  .styled-brand {
    color: white !important;
    opacity: .85 !important;
  }

  .router-link-active { opacity: 1 !important; }

  .styled-brand:hover {
    opacity: 1 !important;
  }

  /* end global nav styles */
</style>

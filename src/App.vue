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
</style>

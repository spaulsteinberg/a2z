<template>
    <div class="main-container">
      <div class="sidebar-wrapper p-3">
        <SideDrawerContainer v-if="mapMounted"/>
        <SideDrawerMapError v-else-if="mapError" />
        <SideDrawerMapLoading v-else-if="mapLoading" />
      </div>
      <MapWrapper />
    </div>
</template>

<script>
    import SideDrawerContainer from "../../components/side-drawer/SideDrawerContainer.vue"
    import MapWrapper from '../../components/map/MapWrapper.vue'
    import { useStore } from "vuex"
    import { computed } from "vue"
    import SideDrawerMapError from "../../components/side-drawer/SideDrawerMapError.vue"
    import SideDrawerMapLoading from "../../components/side-drawer/SideDrawerMapLoading.vue"
    export default {
      name: 'MainView',
      components: {
        SideDrawerContainer,
        MapWrapper,
        SideDrawerMapError,
        SideDrawerMapLoading
    },
    setup () {
      const { state } = useStore()
      return {
        mapMounted: computed(() => state.googleMaps.mapMounted),
        mapLoading: computed(() => state.googleMaps.loading),
        mapError: computed(() => state.googleMaps.error),
      }
    }
}
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .sidebar-wrapper {
    display: flex;
    justify-content: center;
    flex: 0 0 30%;
    border-right: 1px solid blue;
  }
</style>
<template>
    <div class="main-container">
      <div class="sidebar-wrapper p-3">
        <SideDrawerContainer :handleSubmit="submitCoordinates" />
      </div>
      <MapWrapper @wrapperMounted="wrapperDidMount" />
    </div>
</template>

<script>
import { ref } from 'vue'
import SideDrawerContainer from "../../components/side-drawer/SideDrawerContainer.vue"
import MapWrapper from '../../components/map/MapWrapper.vue'
export default {
    name: 'MainView',
    components: {
      SideDrawerContainer,
      MapWrapper
    },
    setup () {

      const mapIsMounted = ref(false)

      function wrapperDidMount() { 
        mapIsMounted.value = true
      }

      function submitCoordinates(source, dest){
        console.log(source, dest)
      }

      return {
        wrapperDidMount, 
        submitCoordinates
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
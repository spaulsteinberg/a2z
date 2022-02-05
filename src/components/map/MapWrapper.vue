<template>
  <div id="map" v-show="!error && !loading"></div>
  <div id="fallback-container" v-if="error || loading">
    <MapFeedback :loading="loading" :error="error"/>
  </div>
</template>

<script>
import { computed, onMounted, toRefs } from "vue"
import { Loader } from '@googlemaps/js-api-loader'
import MapFeedback from "./MapFeedback.vue"
import { useStore } from "vuex"
export default {
    name: "MapWrapper",
    setup() {
        const store = useStore()
        const loader = new Loader({
            apiKey: process.env.VUE_APP_MAPS_KEY,
            version: "weekly",
            libraries: ["places"]
        });
        const mapOptions = {
            center: {
                lat: 30.3079827,
                lng: -97.8934853
            },
            zoom: 10
        };
        onMounted(() => {
          store.commit('googleMaps/setMapLoading', true)
          store.commit('googleMaps/setMapError', '')
          loader
          .load()
          .then((google) => {
            store.commit('googleMaps/setMap', new google.maps.Map(document.getElementById("map"), mapOptions))
            store.commit('googleMaps/setMapMounted', true)
          })
          .catch(err => {
            console.log('[ERROR]:', err)
            store.commit('googleMaps/setMapError', 'Something went wrong loading maps.')
          })
          .finally(() => {
            store.commit('googleMaps/setMapLoading', false)
          })
        })
        return {
          loading: computed(() => store.state.googleMaps.loading),
          error: computed(() => store.state.googleMaps.error)
        };
    },
    components: { MapFeedback }
}
</script>

<style>
  #map, #fallback-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 70%;
  }
  #map:hover {
    cursor: grab;
  }
  .feedback-wrapper {
    display: flex;
    width: 20%;
  }
</style>
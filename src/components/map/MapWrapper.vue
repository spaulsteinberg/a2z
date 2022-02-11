<template>
  <div id="map" v-show="!error && !loading"></div>
  <div id="fallback-container" v-if="error || loading">
    <MapFeedback :loading="loading" :error="error"/>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, watch } from "vue"
import { Loader } from '@googlemaps/js-api-loader'
import MapFeedback from "./MapFeedback.vue"
import { useStore } from "vuex"
import _ from 'lodash'

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

        // handles the markers, seemingly needs to be directly with the map component.
        // this will watch for new props updated to the store from the side panel
        // clear old markers, and create new ones
        let markers = {
          source: null,
          destination: null
        }

        const addMarker = ( lat, lng, label ) => {
          return new store.state.googleMaps.google.maps.Marker({
            position: { lat, lng },
            map: store.state.googleMaps.map,
            label: label
          })
        }

        const addSource = ({ lat, lng, label }) => {
          markers.source = addMarker(lat, lng, label)
        }

        const removeSource = () => {
          if (markers.source) markers.source.setMap(null)
        }

        const addDestination = ({ lat, lng, label }) => {
          markers.destination = addMarker(lat, lng, label)
        }

        const removeDestination = () => {
          if (markers.destination) markers.destination.setMap(null)
        }

        onMounted(() => {
          store.commit('googleMaps/setMapLoading', true)
          store.commit('googleMaps/setMapError', '')
          loader
          .load()
          .then((google) => {
            store.commit('googleMaps/setGoogle', google)
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

        onUnmounted(() => {
          store.commit('googleMaps/removeMarkers')
        })

        watch(() => _.cloneDeep(store.getters["googleMaps/getSourceMarker"]), newValues => {
          console.log("WATCH SOURCE", newValues)
          removeSource()
          addSource(newValues)
        }, {
          deep: true
        })

        watch(() => _.cloneDeep(store.getters["googleMaps/getDestinationMarker"]), newValues => {
          console.log("WATCH DEST", newValues)
          removeDestination()
          addDestination(newValues)
        }, {
          deep: true
        })


        return {
          loading: computed(() => store.state.googleMaps.loading),
          error: computed(() => store.state.googleMaps.error),
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
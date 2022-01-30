<template>
  <div id="map" v-show="!error"></div>
  <div id="fallback-container" v-if="error || loading">
    <MapFeedback :loading="loading" :error="error"/>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue"
import { Loader } from '@googlemaps/js-api-loader'
import MapFeedback from "./MapFeedback.vue"
export default {
    name: "MapWrapper",
    setup(props, context) {
        const state = reactive({
          loading: false,
          error: false,
          success: false
        })
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
            state.loading = true
            state.error = false
            state.success = false
            console.log("past setting")
            loader
            .load()
            .then((google) => {
              console.log("in then")
              state.success = true
              new google.maps.Map(document.getElementById("map"), mapOptions);
              context.emit('wrapperMounted');
            })
            .catch(err => {
              console.log(err)
              state.error = true
            })
            .finally(() => {
              console.log("in finally")
              state.loading = false
            })
        })
        return {
            ...toRefs(state)
        };
    },
    emits: ["wrapperMounted"],
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
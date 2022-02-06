<template>
  <div class="source-dest-container">
    <AZInputGroup v-model.trim="source" id="source-loc" placeholder="Enter your starting point" labelText="Start: " hasMargin/>
    <AZInputGroup v-model.trim="destination" id="destination-loc" placeholder="Choose your destination" labelText="Destination: " hasMargin/>
    <button class="btn btn-primary mt-2" @click="handleGeocodingSubmit()">Go!</button>
  </div>
</template>

<script>
    import { ref, onMounted, reactive } from 'vue'
    import { useStore } from 'vuex';
    import AZInputGroup from '../utility/AZInputGroup.vue';
    export default {
        name: 'SideDrawerContainer',
        components: {
          AZInputGroup
        },
        setup(){
          const store = useStore()
          const source = ref('');
          const destination = ref('')
          const startLabel = "A",
                destLabel = "Z"

          const inputState = reactive({
            autocompleteSource: null,
            autocompleteDestination: null,
          })

          onMounted(() => {
            inputState.autocompleteSource = new window.google.maps.places.Autocomplete(
              document.getElementById("source-loc")
            )

            inputState.autocompleteDestination = new window.google.maps.places.Autocomplete(
              document.getElementById("destination-loc")
            )

            inputState.autocompleteSource.setComponentRestrictions({
              country: ["us"]
            })

            inputState.autocompleteDestination.setComponentRestrictions({
              country: ["us"]
            })
          })
          
          function handleGeocodingSubmit(){
            /*
              TODO - // make sure both addresses are valid
            // if not, show error styles
            // make button disabled until valid
            */
            const sourcePlace = inputState.autocompleteSource.getPlace();
            const destPlace = inputState.autocompleteDestination.getPlace();

            if (!sourcePlace || !sourcePlace.place_id) {
              console.log("return and show error for source")
              return
            }

            if (!destPlace || !destPlace.place_id){
              console.log("return and show error for dest")
              return
            }

            const sourcePayload = {
              lng: sourcePlace.geometry.location.lng(),
              lat: sourcePlace.geometry.location.lat(),
              label: startLabel
            }
            const destPayload = {
              lng: destPlace.geometry.location.lng(),
              lat: destPlace.geometry.location.lat(),
              label: destLabel
            }

            store.commit('googleMaps/setStartMarker', sourcePayload)
            store.commit('googleMaps/setDestinationMarker', destPayload)
          }

          return {
            source,
            destination,
            handleGeocodingSubmit
          }
        }
    }
</script>

<style scoped>
  .source-dest-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
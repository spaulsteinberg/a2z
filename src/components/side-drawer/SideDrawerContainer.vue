<template>
  <div class="source-dest-container">
    <AZInputGroup v-model.trim="source" id="source-loc" placeholder="Enter your starting point" labelText="Start: " hasMargin/>
    <button class="btn swap-btn" @click="handleSwapLocations">
      <SwapIcon />
    </button>
    <AZInputGroup v-model.trim="destination" id="destination-loc" placeholder="Choose your destination" labelText="Destination: " :hasMargin="false"/>
    <button class="btn btn-primary mt-2" @click="handleGoClick" :disabled="!validPlaces">Go!</button>
  </div>
</template>

<script>
    import { ref, onMounted, computed } from 'vue'
    import { useStore } from 'vuex';
    import AZInputGroup from '../utility/AZInputGroup.vue';
    import SwapIcon from '../icons/SwapIcon.vue';
    export default {
        name: 'SideDrawerContainer',
        components: {
            AZInputGroup,
            SwapIcon
        },
        setup(){
          const store = useStore()
          const source = ref('');
          const destination = ref('')
          const autocompleteSource = ref(null)
          const autocompleteDestination = ref(null)
          const startLabel = "A",
                destLabel = "Z"
          const validPlaces = computed(() => source.value && destination.value ? true : false)
          onMounted(() => {
            autocompleteSource.value = new window.google.maps.places.Autocomplete(
              document.getElementById("source-loc")
            )

            autocompleteDestination.value = new window.google.maps.places.Autocomplete(
              document.getElementById("destination-loc")
            )

            autocompleteSource.value.setComponentRestrictions({
              country: ["us"]
            })

            autocompleteDestination.value.setComponentRestrictions({
              country: ["us"]
            })
          })

          const getLngLat = location => {
            return {
              lng: location.lng(),
              lat: location.lat()
            }
          }

          const handleSwapLocations = () => {
            if (!autocompleteDestination.value || !autocompleteSource.value) return
            
            const oldSourceAuto = autocompleteSource.value
            const oldSourceAutoValue = autocompleteSource.value.getPlace().formatted_address
            const oldDestinationAutoValue = autocompleteDestination.value.getPlace().formatted_address
            autocompleteSource.value = autocompleteDestination.value
            autocompleteDestination.value = oldSourceAuto
            source.value = oldDestinationAutoValue
            destination.value = oldSourceAutoValue
            handleGeocodingSubmit(autocompleteSource.value, autocompleteDestination.value)
          }

          const handleGoClick = () => handleGeocodingSubmit(autocompleteSource.value, autocompleteDestination.value)

          const calculateAndDisplayRoute = (origin, destination) => {
            const directionService = new store.state.googleMaps.google.maps.DirectionsService()
            const directionRenderer = new store.state.googleMaps.google.maps.DirectionsRenderer({map: store.state.googleMaps.map, suppressMarkers: true})
            console.log(directionService, directionRenderer)
            directionService
            .route({
              origin: origin,
              destination: destination,
              travelMode: store.state.googleMaps.google.maps.TravelMode.DRIVING
            })
            .then(result => {
              console.log(result)
              directionRenderer.setDirections(result)
            })
            .catch(err => console.log("error", err))
          }
          
          const handleGeocodingSubmit = (source, destination) => {
            
            const sourcePlace = source.getPlace();
            const destPlace = destination.getPlace();

            if (!sourcePlace || !sourcePlace.place_id) {
              console.log("return and show error for source")
              return
            }

            if (!destPlace || !destPlace.place_id){
              console.log("return and show error for dest")
              return
            }

            const sourceLocation = getLngLat(sourcePlace.geometry.location)
            const destLocation = getLngLat(destPlace.geometry.location)

            const sourcePayload = { ...sourceLocation, label: startLabel }
            const destPayload = { ...destLocation, label: destLabel }
            
            calculateAndDisplayRoute(sourceLocation, destLocation)

            store.commit('googleMaps/setStartMarker', sourcePayload)
            store.commit('googleMaps/setDestinationMarker', destPayload)
          }

          return {
            source,
            destination,
            validPlaces,
            handleSwapLocations,
            handleGoClick
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

  .swap-btn {
    background-color: var(--pink-theme);
    color: white;
    width: 50px;
    align-self: center;
    margin-top: .5rem;
    margin-bottom: .25rem;
  }
</style>
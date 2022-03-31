<template>
  <div class="source-dest-container">
    <AZInputGroup v-model.trim="source" id="source-loc" placeholder="Enter your starting point" labelText="Start: " hasMargin/>
    <button class="btn swap-btn" @click="handleSwapLocations">
      <SwapIcon fill="white" />
    </button>
    <AZInputGroup v-model.trim="destination" id="destination-loc" placeholder="Choose your destination" labelText="Destination: " :hasMargin="false"/>
    <button class="btn btn-primary mt-2" @click="handleGoClick" :disabled="!validPlaces" v-if="!success">Go!</button>
    <template v-else>
      <button class="btn btn-primary mt-2" @click="handleOpenTicketModal">Create Ticket</button>
      <button class="btn btn-outline-info mt-2" @click="handleClearMap">Clear</button>
    </template>
    <div class="my-3" v-if="loading">
      <AZFeedbackAlert text="Calculating Route..." centered includeSpinner/>
    </div>
    <div class="my-3" v-if="error" >
      <AZFeedbackAlert :text="error" severity="danger" centered />
    </div>
    <div class="ticket-container my-5"> 
      <div v-if="ticketLoading">
      <AZFeedbackAlert text="Fetching Tickets..." centered includeSpinner/>
      </div>
      <div v-else-if="ticketError" >
        <AZFeedbackAlert :text="ticketError" severity="danger" centered />
      </div>
      <template v-else>
        <button class="btn btn-info text-light" @click="showRecentTickets = !showRecentTickets" v-if="!showRecentTickets">Show Recent Tickets</button>
        <button class="btn btn-secondary" @click="showRecentTickets = !showRecentTickets" v-else>Hide Recent Tickets</button>
        <div class="my-5">
          <RecentTicketCards :showViewAll="false" v-if="showRecentTickets"/>
        </div>
      </template>
    </div>
  </div>
  <CreateTicketModal :data="createTicketData" @closeModal="handleCloseTicketModal" v-if="showCreateTicketModal" />
</template>

<script>
    import { ref, onMounted, computed, reactive, toRefs } from 'vue'
    import { useStore } from 'vuex';
    import { AZInputGroup , AZFeedbackAlert } from '../utility';
    import SwapIcon from '../icons/SwapIcon.vue';
    import CreateTicketModal from "../tickets/CreateTicketModal.vue"
    import { getAuth } from '@firebase/auth';
import RecentTicketCards from '../profile/tickets/RecentTicketCards.vue';
    export default {
        name: 'SideDrawerContainer',
        components: {
    AZInputGroup,
    SwapIcon,
    AZFeedbackAlert,
    CreateTicketModal,
    RecentTicketCards
},
        setup(){
          const store = useStore()
          const auth = getAuth()
          const source = ref('');
          const destination = ref('')
          const autocompleteSource = ref(null)
          const autocompleteDestination = ref(null)
          const showCreateTicketModal = ref(false)
          const createTicketData = ref(null)
          const startLabel = "A",
                destLabel = "Z"
          const validPlaces = computed(() => source.value && destination.value ? true : false)
          const ticketLoading = computed(() => store.state.ticket.isLoading)
          const ticketError = computed(() => store.state.ticket.error)
          const showRecentTickets = ref(false)

          const geoState = reactive({
            loading: false,
            success: false,
            error: ""
          })

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

            if (!store.getters["ticket/getHasData"]) {
              store.dispatch("ticket/getTickets", { user: auth.currentUser })
              console.log("dispatching")
            }

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

          const handleOpenTicketModal = () => {
            console.log("create ticket click...")
            showCreateTicketModal.value = true
          }

          const handleCloseTicketModal = () => {
            showCreateTicketModal.value = false 
          }

          const handleClearMap = () => {
            geoState.loading = false
            geoState.error = ""
            geoState.success = false
            store.commit('googleMaps/removeMarkers')
            store.commit('googleMaps/removeRouteDisplay')
            store.commit('googleMaps/setDirectionRenderer')
            source.value = ""
            destination.value = ""
          }
          
          const calculateAndDisplayRoute = (origin, destination) => {
            store.state.googleMaps.directions.service
            .route({
              origin: origin,
              destination: destination,
              travelMode: store.state.googleMaps.google.maps.TravelMode.DRIVING
            })
            .then(result => {
              console.log(result)
              store.state.googleMaps.directions.renderer.setDirections(result)
              geoState.success = true
              const route = result.routes[0].legs[0]
              const distance = parseFloat((route.distance.value / 1609.34).toFixed(2))
              createTicketData.value = {
                waypoints: [result.geocoded_waypoints[0].place_id, result.geocoded_waypoints[1].place_id],
                address: {
                  start: route.start_address,
                  end: route.end_address
                },
                distance,
                distanceText: `${distance} miles`,
                duration: route.duration.text
              }
            })
            .catch(err => {
              console.log("error", err)
              geoState.error = "Could not display this route."
            })
            .finally(() => geoState.loading = false)
          }
          
          const handleGeocodingSubmit = (source, destination) => {
            geoState.loading = true
            geoState.error = ""
            geoState.success = false
            const sourcePlace = source.getPlace();
            const destPlace = destination.getPlace();

            if (!sourcePlace || !sourcePlace.place_id) {
              geoState.loading = false
              geoState.error = "Invalid Start Location. Please choose from the dropdown list."
              return
            }

            if (!destPlace || !destPlace.place_id){
              geoState.loading = false
              geoState.error = "Invalid Destination Location. Please choose from the dropdown list."
              return
            }

            const sourceLocation = getLngLat(sourcePlace.geometry.location)
            const destLocation = getLngLat(destPlace.geometry.location)

            const sourcePayload = { ...sourceLocation, label: startLabel }
            const destPayload = { ...destLocation, label: destLabel }

            store.commit('googleMaps/setStartMarker', sourcePayload)
            store.commit('googleMaps/setDestinationMarker', destPayload)
            
            calculateAndDisplayRoute(sourceLocation, destLocation)
          }

          return {
            source,
            destination,
            validPlaces,
            ...toRefs(geoState),
            handleSwapLocations,
            handleGoClick,
            handleOpenTicketModal,
            handleCloseTicketModal,
            handleClearMap,
            showCreateTicketModal,
            createTicketData,
            ticketLoading,
            ticketError,
            showRecentTickets
          }
        }
    }
</script>

<style scoped>
  .source-dest-container, .ticket-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .ticket-container {
    scroll-behavior: smooth;
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
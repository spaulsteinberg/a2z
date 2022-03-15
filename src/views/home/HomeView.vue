<template>
  <AZCard>
    <template v-slot:header>
      <h2 class="text-center">Create Ticket</h2>
    </template>
    <template v-slot:content>
      <div>Start: {{ start }}</div>
      <div>End: {{ end }}</div>
      <div>Distance: {{ distance }}</div>
      <div>Duration: {{ duration }}</div>
      <div>
        <label class="mx-1">Base Pay:</label>
        <input type="number" v-model="basePay" />
      </div>
      <div>
        <label class="mx-1">Rate/Mile:</label>
        <input type="number" v-model="ratePerMile" />
      </div>
      <div>Total: {{ total }}</div>
      <div>
        <label>Description</label>
        <div>
          <textarea rows="5" v-model="description">description goes here</textarea>
        </div>
      </div>
      <hr />
      <div>Place 1: {{ startPlace }}</div>
      <div>Place 2: {{ endPlace }}</div>
      <div>company name and contact</div>
      <button class="btn btn-info" @click="handleGetTickets">Get Tickets</button>
      <button class="btn btn-primary" @click="handleCreateTicket">Create Ticket</button>
      <div class="my-4">
        <p v-for="id of ticketIds" :key="id">{{ id }}</p>
      </div>
    </template>
  </AZCard>
<!--   <TicketCard 
    :startPlaceFormatted="startTicketPlace" 
    :endPlaceFormatted="endTicketPlace" 
    :tripDuration="duration"
    :tripValue="total"
    v-if="finished" /> -->
</template>

<script>
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AZCard from '../../components/utility/AZCard.vue'
//import TicketCard from '../../components/ticket/TicketCard.vue'
export default {
  name: "HomeView",
  setup() {
    const start = ref('')
    const end = ref('')
    const distance = ref('')
    const distanceValue = ref(0)
    const duration = ref('')
    const startPlace = ref('')
    const description = ref('')
    const endPlace = ref('')
    const basePay = ref(0)
    const ratePerMile = ref(0)
    const startTicketPlace = ref('')
    const endTicketPlace = ref('')
    const total = computed(() => basePay.value + distanceValue.value * ratePerMile.value)
    const store = useStore()
    const auth = getAuth()
    const ticketIds = computed(() => store.state.ticket.tickets.map(t => t.ticketId))
    const finished = ref(false)
    const show = ref(false)
    onMounted(() => {
      axios.get("./directions.json")
        .then(raw => raw.data)
        .then(res => {
          console.log(res.geocoded_waypoints)
          startPlace.value = res.geocoded_waypoints[0].place_id
          endPlace.value = res.geocoded_waypoints[1].place_id
          return res
        })
        .then(res => res.routes[0].legs[0])
        .then(route => {
          console.log(route.start_address);
          console.log(route.end_address);
          console.log(route.distance.text);
          console.log(route.duration.text);
          start.value = route.start_address
          end.value = route.end_address
          distanceValue.value = parseFloat((route.distance.value / 1609.34).toFixed(2))
          distance.value = `${distanceValue.value} miles`
          duration.value = route.duration.text
          const temp = route.start_address.split(",")
          const temp2 = route.end_address.split(",")
          startTicketPlace.value = `${temp[1]},${temp[2].substring(0, 3)}`
          endTicketPlace.value = `${temp2[1]},${temp2[2].substring(0, 3)}`
        })
        .catch(err => console.log(err))
        .finally(() => finished.value = true)
    });

    const handleGetTickets = async () => {
      await store.dispatch("ticket/getTickets", { user: auth.currentUser })
    }

    const handleCreateTicket = async () => {
      try {
        const tempStartCityState = start.value.split(",")
        const tempEndCityState = end.value.split(",")
        const request = {
          start_address: start.value,
          destination_address: end.value,
          start_city_state: `${tempStartCityState[1]},${tempStartCityState[2].substring(0, 3)}`.trim(),
          end_city_state: `${tempEndCityState[1]},${tempEndCityState[2].substring(0, 3)}`.trim(),
          distance: distanceValue.value,
          distanceFormatted: distance.value,
          est_duration: duration.value,
          base_pay: basePay.value,
          rate_per_mile: ratePerMile.value,
          total: total.value,
          description: description.value,
          places: {
            start: startPlace.value,
            end: endPlace.value
          },
          hasStatus: "OPEN"
        }
        await store.dispatch("ticket/postTicket", { user: auth.currentUser, request: request })
      } catch (err) {
        console.log(err)
      }
    }

    const setShow = () => show.value = !show.value

    return {
      start, 
      end, 
      distance, 
      duration, 
      description,
      startPlace, 
      endPlace, 
      total, 
      basePay, 
      ratePerMile, 
      show,
      setShow,
      handleGetTickets, 
      handleCreateTicket, 
      ticketIds,
      startTicketPlace,
      endTicketPlace,
      finished
    }
  },
  components: { AZCard, /* TicketCard */ }
}
</script>

<style scoped>
.card {
  margin: 3rem auto;
  max-width: 500px;
}

</style>
<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="ticket-place-container">
                <div class="ticket-place">{{ startPlaceFormatted }}</div>
                <div class="truck-icon">
                    <TruckIcon />
                </div>
                <div class="ticket-place dest-ticket-place">{{ endPlaceFormatted }}</div>
                <div class="text-center duration-box mt-2 mb-2">{{ tripDuration }} </div>
                <div class="col mb-3">
                    <AZProgress variant="bg-success" :value="ticketStatus" striped />
                </div>
            </div>
            <div class="ticket-place-container-footer">
                <div class="ticket-price">${{ tripValue.toFixed(2) }}</div>
                <div class="ticket-view-details text-end">
                  <button class="btn btn-light">View Details</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TruckIcon from "../icons/TruckIcon.vue";
import AZProgress from "../utility/AZProgress.vue";
import TicketStatus from '../../constants/TicketStatus'
export default {
    name: "TicketCard",
    props: {
        startPlaceFormatted: {
            type: String,
            default: "",
            required: true
        },
        endPlaceFormatted: {
            type: String,
            default: "",
            required: true
        },
        tripDuration: {
            type: String,
            required: true
        },
        tripValue: {
            type: Number,
            required: true
        },
        status: {
          type: String,
          required: true
        }
    },
    setup(props){
      // temporary
      const ticketStatus = props.status === TicketStatus.OPEN ? 0 : props.status === TicketStatus.IN_PROGRESS ? 50 : 100
      return {
        ticketStatus,
      }
    },
    components: { TruckIcon, AZProgress },
}
</script>

<style scoped>
.ticket-place-container, .ticket-place-container-footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ticket-place-container-footer {
  align-items: center;
}
.ticket-place {
  flex: 0 0 40%;
}
.ticket-price, .ticket-view-details {
  flex: 0 0 50%;
}
.truck-icon {
  flex: 0 0 20%;
  text-align: center;
}
.dest-ticket-place {
  text-align: end;
}
.duration-box {
  flex: 0 0 100%;
}
</style>
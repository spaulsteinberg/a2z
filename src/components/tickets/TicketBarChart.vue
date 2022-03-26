<template>
    <div class="chart-container">
        <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    chart-id="ticket-bar-chart"
    dataset-id-key="datasetIdKey"
    :width="300"
    :height="200"
  />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useStore } from 'vuex'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

export default {
    name: 'TicketBarChart',
    components: { Bar },
    setup(){
        const height = 400,
              width = 400
        const store = useStore()
        const labels = [ 'Open', 'In Progress', 'Completed', "Cancelled" ]
        const backgroundColor = [
            'rgb(0, 32, 255)',
            '#0dcaf0',
            '#028a0f',
            '#e3242b',
        ]
        const chartData = computed(() => ({
            labels,
            datasets: [{ 
                data: [
                    store.getters["ticket/getNumberOfOpenTickets"],
                    store.getters["ticket/getNumberOfInProgressTickets"],
                    store.getters["ticket/getNumberOfCompletedTickets"],
                    store.getters["ticket/getNumberOfCancelledTickets"],
                ], 
                backgroundColor
            }]
        }))
        const chartOptions = {
            responsive: true,
        }

        return {
           chartData, chartOptions, height, width
        }
    }
}
</script>

<style scoped>
.chart-container {
    height: 300px;
    width: 300px
}
</style>
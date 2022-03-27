<template>
    <div id="ticket-revenue" class="chart-container">
        <Pie
            :chart-options="chartOptions"
            :chart-data="chartData"
            chart-id="ticket-pie-chart"
            data-set-id-key="datasetIdKey"
            :width="300"
            :height="200"
        />
    </div>
</template>

<script>

import { Pie } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend } from 'chart.js'
import { useStore } from "vuex"
import { computed } from "vue"

ChartJS.register(Title, Tooltip, ArcElement, Legend)
export default {
    name: 'TicketRevenueVisual',
    components: { Pie },
    setup() {
        const store = useStore();

        const chartOptions = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Current Ticket Value'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " $" + context.parsed.toFixed(2)
                        }
                    },
                    titleColor: "black"
                }
            },
        }

        const chartData = computed(() => ({
            labels: ["Open", "In Progress", "Completed", "Cancelled"],
            datasets: [
                {
                    backgroundColor: [
                        'rgb(0, 32, 255)',
                        '#0dcaf0',
                        '#028a0f',
                        '#e3242b',
                    ],
                    data: [
                        store.getters["ticket/getOpenTicketCostBasis"],
                        store.getters["ticket/getInProgressTicketCostBasis"],
                        store.getters["ticket/getCompletedTicketCostBasis"],
                        store.getters["ticket/getCancelledTicketCostBasis"]
                    ],
                }
            ]
        }))

        return {
            chartOptions,
            chartData,
        }
    }
}
</script>

<style scoped>
#ticket-revenue {
    margin-top: 0;
}

@media screen and (min-width: 992px) {
    #ticket-revenue {
        margin-top: 2rem;
    }
}
</style>
<template>
    <div class="section-container">
        <h2 class="text-center mb-4 text-white">Available on all devices!</h2>
        <div class="device-container">
            <div class="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :fill="fill"
                    class="bi bi-phone-fill" viewBox="0 0 16 16">
                    <path
                        d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                </svg>
            </div>
            <div class="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :fill="fill"
                    class="bi bi-tablet-landscape-fill" viewBox="0 0 16 16">
                    <path
                        d="M2 14a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2zm11-7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
            </div>
            <div class="mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :fill="fill"
                    class="bi bi-laptop-fill" viewBox="0 0 16 16">
                    <path
                        d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomeDevices',
    props: {
        width: Number,
        height: Number,
        fill: String
    }
}
</script>

<style scoped>

.section-container {
    padding: 2rem;
    background-color: #6610f2 !important;
}
.device-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
}
</style>
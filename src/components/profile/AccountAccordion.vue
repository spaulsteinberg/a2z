<template>
    <AZAccordion :id="accordionId">
        <AZAccordionItem title="Basic Info" :parent="accordionParentId" headerId="basicInfoHeader" forTarget="#basicInfo" forId="basicInfo">
            <template v-slot:body>
                basic info here
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Tickets" :parent="accordionParentId" headerId="ticketsHeader" forTarget="#ticketsInfo" forId="ticketsInfo">
            <template v-slot:body>
                tickets here
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Notifications" :parent="accordionParentId" headerId="notificationssHeader" forTarget="#notificationsInfo" forId="notificationsInfo">
            <template v-slot:body>
                notifications here
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Credentials" :parent="accordionParentId" headerId="credentialsHeader" forTarget="#credentialsInfo" forId="credentialsInfo">
            <template v-slot:body>
                credentials here
            </template>
        </AZAccordionItem>
    </AZAccordion>
</template>

<script>
import AZAccordionItem from "../utility/AZAccordionItem.vue";
import AZAccordion from "../utility/AZAccordion.vue";
    export default {
    name: "AccountAccordion",
    setup() {
        return {
            accordionId: "accountAccordion",
            accordionParentId: "#accountAccordion"
        }
    },
    components: { AZAccordionItem, AZAccordion }
}
</script>


<style scoped>
</style>
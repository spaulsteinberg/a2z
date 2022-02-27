<template>
    <AZAccordion :id="accordionId">
        <AZAccordionItem title="Basic Info" :parent="accordionParentId" headerId="basicInfoHeader" forTarget="#basicInfo" forId="basicInfo">
            <template v-slot:body>
                <BasicInfo v-if="!accountLoading && !accountError"/>
                <AZFeedbackAlert text="Loading Account..." severity="primary" centered includeSpinner textAlign="center" v-else-if="accountLoading"/>
                <AZFeedbackAlert text="An error occurred loading your account." severity="danger" centered v-else-if="accountError" />
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Tickets" :parent="accordionParentId" headerId="ticketsHeader" forTarget="#ticketsInfo" forId="ticketsInfo">
            <template v-slot:body>
                <RecentTicketCards v-if="!ticketLoading && !ticketError" />
                <AZFeedbackAlert text="Loading Tickets..." severity="primary" centered includeSpinner textAlign="center" v-else-if="ticketLoading"/>
                <AZFeedbackAlert text="An error occurred loading your tickets." severity="danger" centered v-else-if="ticketError" />
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Notifications" :parent="accordionParentId" headerId="notificationssHeader" forTarget="#notificationsInfo" forId="notificationsInfo">
            <template v-slot:body>
                notifications here
            </template>
        </AZAccordionItem>
        <AZAccordionItem title="Credentials" :parent="accordionParentId" headerId="credentialHeader" forTarget="#credentialInfo" forId="credentialInfo">
            <template v-slot:body>
                <div class="mb-1"><AZBlockLink to="/profile/account/update/email" linkText="Update Email" /></div>
                <AZBlockLink to="/profile/account/change/password" linkText="Change Password" />
            </template>
        </AZAccordionItem>
    </AZAccordion>
</template>

<script>
    import AZAccordionItem from "../utility/AZAccordionItem.vue";
    import AZAccordion from "../utility/AZAccordion.vue";
    import AZBlockLink from "../utility/AZBlockLink.vue";
    import BasicInfo from "./basic-info/BasicInfo.vue";
    import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue";
    import RecentTicketCards from "./tickets/RecentTicketCards.vue";
    export default {
    name: "AccountAccordion",
    props: {
        accountLoading: {
            type: Boolean,
            required: true
        },
        accountError: {
            type: String,
            required: true
        },
        ticketLoading: {
            type: Boolean,
            required: true
        },
        ticketError: {
            type: String, 
            required: true
        },
    },
    setup() {
        return {
            accordionId: "accountAccordion",
            accordionParentId: "#accountAccordion",
        }
    },
    components: { AZAccordionItem, AZAccordion, AZBlockLink, BasicInfo, AZFeedbackAlert, RecentTicketCards }
}
</script>


<style scoped>
.loading-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
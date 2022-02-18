<template>
    <AZAccordion :id="accordionId">
        <AZAccordionItem title="Basic Info" :parent="accordionParentId" headerId="basicInfoHeader" forTarget="#basicInfo" forId="basicInfo">
            <template v-slot:body>
                <BasicInfo :loading="accountLoading" :error="accountError" :store="store" :auth="auth" v-if="!accountLoading"/>
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
    import BasicInfo from "./BasicInfo.vue";
    export default {
    name: "AccountAccordion",
    props: {
        store: Object,
        auth: Object,
        accountLoading: {
            type: Boolean,
            required: true
        },
        accountError: {
            type: String,
            required: true
        }
    },
    setup() {
        return {
            accordionId: "accountAccordion",
            accordionParentId: "#accountAccordion",
        }
    },
    components: { AZAccordionItem, AZAccordion, AZBlockLink, BasicInfo }
}
</script>


<style scoped>
</style>
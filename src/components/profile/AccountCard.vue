<template>
    <div class="account-container">
        <AZCard>
        <template v-slot:header>
            <h2 class="text-center">My Account</h2>
        </template>
        <template v-slot:content>
            <AccountAccordion />
        </template>
    </AZCard>
    </div>
</template>

<script>
    import { onMounted } from "vue";
    import AZCard from "../utility/AZCard.vue";
    import AccountAccordion from "./AccountAccordion.vue";
    import axios from 'axios'
    import getFirebaseIdToken from "../../firebase/getFirebaseIdToken"
    import { getAuth } from "firebase/auth";
    export default {
        name: 'AccountCard',
        components: { AZCard, AccountAccordion },
        setup(){
            const auth = getAuth()
            onMounted( async () => {
                try {
                    const token = await getFirebaseIdToken(auth.currentUser)
                    axios.get("http://localhost:3000/api/v1/account", { headers: { token: token } })
                    .then(res => console.log("success~", res))
                    .catch(err => console.log("err", err))
                } catch (err) {
                    console.log("on mounted err")
                }
            })
        }
    }
</script>

<style scoped>
    .card {
        max-width: 700px;
        flex: 0 0 100%;
    }

    .account-container {
        padding: 0 1rem;
        margin: 4rem 0;
        display: flex;
        justify-content: center;
    }
</style>
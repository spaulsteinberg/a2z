<template>
    <div class="basic-info-wrapper">
        <div class="basic-info-name">
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="firstName" id="firstName" placeholder="First Name" labelText="First Name:" hasMargin/>
            </div>
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="lastName" id="lastName" placeholder="Last Name" labelText="Last Name:" hasMargin/>
            </div>
        </div>
        <div class="basic-info-address">
            <div class="main-addr">
                <AZInputGroup v-model.trim.lazy="streetAddress" id="streetAddress" placeholder="street, city, state, zip" labelText="Address:" hasMargin/>
            </div>
            <div class="secondary-addr">
                <div class="zip-addr">
                <AZInputGroup v-model.trim.lazy="zipCode" id="zipCode" labelText="Zip Code:" hasMargin/>
                </div>
                <div class="apt-addr">
                    <AZInputGroup v-model.trim.lazy="apt" id="apt" labelText="Apt #:" hasMargin/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import AZInputGroup from "../utility/AZInputGroup.vue";
    export default {
        name: 'BasicInfo',
        components: { AZInputGroup },
        props: {},
        setup(props){
            const firstName = ref('')
            const lastName = ref('')
            const streetAddress = ref('')
            const zipCode = ref('')
            const apt = ref('')

            return {
                firstName,
                lastName,
                streetAddress,
                zipCode,
                apt
            }
        }
    }
</script>

<style scoped>
    .basic-info-wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .basic-info-name, .basic-info-address {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
    }

    .secondary-addr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
    }
    .zip-addr, .apt-addr {
        flex: 0 0 47.5%
    }

    @media screen and (max-width: 260px){ 
        .secondary-addr { flex-direction: column;}
    }
    @media screen and (min-width: 500px){
        .basic-info-name, .basic-info-address {
            flex-direction: row;
        }
        .name-input {
            flex: 0 0 48%
        }
        .main-addr {
            flex: 0 0 60%;
        }

        .secondary-addr {
            flex: 0 0 37%
        }

        .zip-addr {
            flex: 0 0 47.5%
        }

        .apt-addr {
            flex: 0 0 47.5%;
        }
    }
</style>
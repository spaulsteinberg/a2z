<template>
    <div class="basic-info-wrapper">
        <img 
            class="img-fluid rounded mx-auto my-3 profile-img" 
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title="Change Profile Picture" 
            alt="profile-pic" 
            :src="photoUrl" 
            @click="uploadPhoto"/>
        <div class="basic-info-name">
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="firstName" id="firstName" placeholder="First Name" labelText="First Name:" hasMargin/>
            </div>
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="lastName" id="lastName" placeholder="Last Name" labelText="Last Name:" hasMargin/>
            </div>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.number.lazy="phoneNumber" id="phoneNumber" labelText="Phone Number:" hasMargin/>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.trim.lazy="companyName" id="companyName" labelText="Company:" hasMargin/>
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
        <button class="btn btn-warning edit-button mx-auto mt-1" @click="handleEditClick">Edit</button>
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
            const photoUrl = ref(props.photoUrl ? props.photoUrl : require('../../../src/assets/person-outline.png'))
            const firstName = ref('')
            const lastName = ref('')
            const phoneNumber = ref('')
            const companyName = ref('')
            const streetAddress = ref('')
            const zipCode = ref('')
            const apt = ref('')

            const uploadPhoto = () => {
                console.log("upload photo")
            }

            const handleEditClick = () => {
                console.log("edit")
            }

            return {
                photoUrl,
                firstName,
                lastName,
                phoneNumber,
                companyName,
                streetAddress,
                zipCode,
                apt,
                uploadPhoto,
                handleEditClick
            }
        }
    }
</script>

<style scoped>

    .edit-button {
        max-width: 75px;
    }
    .profile-img {
        max-width: 100%;
        height: 100px;
    }
    .profile-img:hover {
        cursor: pointer;
    }
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
        .single-line-input {
            width: 47.5%
        }
        .edit-button {
            width: 30%;
        }
    }
</style>
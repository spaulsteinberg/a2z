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
                <AZInputGroup v-model.trim.lazy="firstName" id="firstName" placeholder="First Name" labelText="First Name:" :disabled="!isEditable" hasMargin/>
            </div>
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="lastName" id="lastName" placeholder="Last Name" labelText="Last Name:" :disabled="!isEditable" hasMargin/>
            </div>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.trim.lazy="phoneNumber" id="phoneNumber" labelText="Phone Number:" :disabled="!isEditable" hasMargin/>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.trim.lazy="companyName" id="companyName" labelText="Company:" :disabled="!isEditable" hasMargin/>
        </div>
        <div class="basic-info-address">
            <div class="main-addr">
                <AZInputGroup v-model.trim.lazy="streetAddress" id="streetAddress" placeholder="street, city, state, zip" labelText="Address:" :disabled="!isEditable" hasMargin/>
            </div>
            <div class="secondary-addr">
                <div class="zip-addr">
                    <AZInputGroup v-model.trim.lazy="zipCode" id="zipCode" labelText="Zip Code:" :disabled="!isEditable" hasMargin/>
                </div>
                <div class="apt-addr">
                    <AZInputGroup v-model.trim.lazy="apt" id="apt" labelText="Apt #:" :disabled="!isEditable" hasMargin/>
                </div>
            </div>
        </div>
    </div>
    <div class="button-wrappers">
        <button class="btn btn-warning basic-info-button mx-auto mt-1" @click="handleEditClick" v-if="!isEditable">Edit</button>
        <template v-else>
            <button class="btn btn-primary mx-1 mt-1" @click="submitInfo">Save Changes</button>
            <button class="btn btn-outline-danger mx-1 mt-1" @click="handleEditClick">Cancel</button>
        </template>
    </div>
</template>

<script>
    import { ref } from "vue";
    import AZInputGroup from "../utility/AZInputGroup.vue";
    import getFirebaseIdToken from "../../firebase/getFirebaseIdToken";
    import axios from "axios";
    import { getAuth } from "firebase/auth";

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
            const isEditable = ref(false)

            const auth = getAuth()

            const uploadPhoto = () => {
                console.log("upload photo")
            }

            const handleEditClick = () => {
                isEditable.value = !isEditable.value
            }

            const submitInfo = async () => {
                const request = { 
                    photoUrl: photoUrl.value,
                    firstName: firstName.value, 
                    lastName: lastName.value, 
                    phoneNumber: phoneNumber.value,
                    companyName: companyName.value,
                    streetAddress: streetAddress.value,
                    zipCode: zipCode.value,
                    apt: apt.value
                }
                try {
                    const token = await getFirebaseIdToken(auth.currentUser)
                    axios.post("http://localhost:3000/api/v1/account", request, { headers: { token: token } })
                    .then(res => {
                        console.log("success", res)
                    })
                    .catch(err => console.log("ERROR", err))
                } catch (err) {
                    console.log("token error", err)
                }
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
                isEditable,
                uploadPhoto,
                handleEditClick,
                submitInfo
            }
        }
    }
</script>

<style scoped>

    .basic-info-button {
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

    .button-wrappers {
        display: flex;
        flex-direction: row;
        justify-content: center;
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

    @media screen and (max-width: 260px){ .secondary-addr { flex-direction: column; } }
    @media screen and (max-width: 360px){ .button-wrappers { flex-direction: column; } }
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
        .basic-info-button {
            width: 30%;
        }
    }
</style>
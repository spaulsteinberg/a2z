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
                <AZInputGroup v-model.trim.lazy="firstName" id="firstName" placeholder="First Name" labelText="First Name:" :disabled="!isEditable || reqLoading" hasMargin/>
            </div>
            <div class="name-input">
                <AZInputGroup v-model.trim.lazy="lastName" id="lastName" placeholder="Last Name" labelText="Last Name:" :disabled="!isEditable || reqLoading" hasMargin/>
            </div>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.trim.lazy="phoneNumber" id="phoneNumber" labelText="Phone Number:" :disabled="!isEditable || reqLoading" hasMargin/>
        </div>
        <div class="single-line-input">
            <AZInputGroup v-model.trim.lazy="companyName" id="companyName" labelText="Company:" :disabled="!isEditable || reqLoading" hasMargin/>
        </div>
        <div class="basic-info-address">
            <div class="main-addr">
                <AZInputGroup v-model.trim.lazy="streetAddress" id="streetAddress" placeholder="street, city, state, zip" labelText="Address:" :disabled="!isEditable || reqLoading" hasMargin/>
            </div>
            <div class="secondary-addr">
                <div class="zip-addr">
                    <AZInputGroup v-model.trim.lazy="zipCode" id="zipCode" labelText="Zip Code:" :disabled="!isEditable || reqLoading" hasMargin/>
                </div>
                <div class="apt-addr">
                    <AZInputGroup v-model.trim.lazy="apt" id="apt" labelText="Apt #:" :disabled="!isEditable || reqLoading" hasMargin/>
                </div>
            </div>
        </div>
    </div>
    <div class="button-wrappers">
        <AZLoadingSpinner spinnerColor="primary" v-if="reqLoading" />
        <template v-else>
            <button class="btn btn-warning mt-1" @click="handleEditClick" v-if="!isEditable">Edit</button>
            <template v-else>
                <button class="btn btn-primary mx-1 mt-1" @click="submitInfo">Save Changes</button>
                <button class="btn btn-outline-danger mx-1 mt-1" @click="handleEditClick">Cancel</button>
            </template>
        </template>
    </div>
    <div class="feedback-wrapper" v-if="reqError">
        <AZFeedbackAlert :text="reqError" severity="danger" centered />
    </div>
</template>

<script>
    import { reactive, ref, toRefs } from "vue";
    import AZInputGroup from "../utility/AZInputGroup.vue";
    import AZFeedbackAlert from "../utility/AZFeedbackAlert.vue";
import AZLoadingSpinner from "../utility/AZLoadingSpinner.vue";
    export default {
        name: 'BasicInfo',
        components: { AZInputGroup, AZFeedbackAlert, AZLoadingSpinner },
        props: {
            store: Object,
            auth: Object,
        },
        setup(props){
            console.log(props.store.state.account)
            const photoUrl = ref(props.store.state.account.photoUrl ? props.store.state.account.photoUrl : require('../../../src/assets/person-outline.png'))
            const firstName = ref(props.store.state.account.firstName)
            const lastName = ref(props.store.state.account.lastName)
            const phoneNumber = ref(props.store.state.account.phoneNumber)
            const companyName = ref(props.store.state.account.companyName)
            const streetAddress = ref(props.store.state.account.streetAddress)
            const zipCode = ref(props.store.state.account.zipCode)
            const apt = ref(props.store.state.account.apt)
            const isEditable = ref(false)

            const postRequest = reactive({
                reqLoading: false,
                reqError: ''
            })

            
            const uploadPhoto = () => {
                if (!isEditable.value || postRequest.reqLoading) return 
                console.log("upload photo")
            }

            const handleEditClick = () => {
                postRequest.reqLoading = false;
                postRequest.reqError = '';
                isEditable.value = !isEditable.value
            }

            const submitInfo = async () => {
                postRequest.reqLoading = true;
                postRequest.reqError = ''
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
                    await props.store.dispatch("account/postAccount", { user: props.auth.currentUser, request: request})
                    isEditable.value = false
                } catch (err) {
                    console.log("err")
                    postRequest.reqError = err;
                } finally {
                    postRequest.reqLoading = false
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
                ...toRefs(postRequest),
                uploadPhoto,
                handleEditClick,
                submitInfo
            }
        }
    }
</script>

<style scoped>

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

    .feedback-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        margin-right: auto;
        margin-left: auto;
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
        .feedback-wrapper {
            width: 50%;
        }
    }
</style>
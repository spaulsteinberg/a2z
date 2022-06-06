<template>
    <div class="basic-info-wrapper">
        <BasicInfoImage
            :photoUrl="photoUrl"
            :picLoading="picLoading"
            :uploadPhoto="uploadPhoto"
            v-if="!picLoading"
        />
        <BasicInfoUploadSpinner v-else />
        <BasicInfoError :error="picError" v-if="picError" />
        <input
            type="file"
            accept="image/*"
            name="imageInput"
            @click="handleFileNameChange"
            @change="handleFileNameChange"
            ref="fileRef"
            hidden
        />
        <div class="basic-info-name">
            <div class="name-input">
                <AZInputGroup
                    v-model.trim.lazy="firstName"
                    id="firstName"
                    placeholder="First Name"
                    labelText="First Name:"
                    :handleBlur="v.firstName.$touch"
                    :isInvalid="v.firstName.$error"
                    :disabled="!isEditable || reqLoading"
                    hasMargin
                />
                <AZErrorBlock v-for="error of v.firstName?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            </div>
            <div class="name-input">
                <AZInputGroup
                    v-model.trim.lazy="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    labelText="Last Name:"
                    :handleBlur="v.lastName.$touch"
                    :isInvalid="v.lastName.$error"
                    :disabled="!isEditable || reqLoading"
                    hasMargin
                />
                <AZErrorBlock v-for="error of v.lastName?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
            </div>
        </div>
        <div class="single-line-input">
            <BasicInfoPhoneInput :value="phoneNumber" id="phoneNumber" labelText="Phone Number: " :disabled="!isEditable || reqLoading" @handleFormatPhoneNumber="handleFormatPhoneNumber" hasMargin/>
        </div>
        <div class="single-line-input">
            <AZInputGroup
                v-model.trim.lazy="companyName"
                id="companyName"
                labelText="Company:"
                :handleBlur="v.companyName.$touch"
                :isInvalid="v.companyName.$error"
                :disabled="!isEditable || reqLoading"
                hasMargin
            />
            <AZErrorBlock v-for="error of v.companyName?.$errors" :key="error.$uid" :error="'*' + error.$message" alignText="text-left" :isSmall="true"/>
        </div>
        <div class="basic-info-address">
            <div class="main-addr">
                <AZInputGroup
                    v-model.trim.lazy="streetAddress"
                    id="streetAddress"
                    placeholder="street, city, state, zip"
                    labelText="Address:"
                    :disabled="!isEditable || reqLoading"
                    hasMargin
                />
            </div>
            <div class="secondary-addr">
                <div class="unit-addr">
                    <AZInputGroup
                        v-model.trim.lazy="unit"
                        id="unit"
                        labelText="Unit #:"
                        :disabled="!isEditable || reqLoading"
                        hasMargin
                    />
                </div>
                <div class="zip-addr">
                    <AZInputGroup
                        v-model.trim.lazy="zipCode"
                        id="zipCode"
                        labelText="Zip Code:"
                        :disabled="!isEditable || reqLoading"
                        hasMargin
                    />
                </div>
            </div>
        </div>
    </div>
    <BasicInfoButtons
        :reqLoading="reqLoading"
        :isEditable="isEditable"
        :handleEditClick="handleEditClick"
        :submitInfo="submitInfo"
        :submitDisabled="v.$invalid"
    />
    <BasicInfoError :error="reqError" v-if="reqError" />
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import AZInputGroup from "../../utility/AZInputGroup.vue";
import { useStore } from "vuex";
import { getAuth } from "firebase/auth";
import BasicInfoUploadSpinner from "./BasicInfoUploadSpinner.vue";
import BasicInfoError from "./BasicInfoError.vue";
import BasicInfoImage from "./BasicInfoImage.vue";
import BasicInfoButtons from "./BasicInfoButtons.vue";
import BasicInfoPhoneInput from "./BasicInfoPhoneInput.vue";
import { useVuelidate } from '@vuelidate/core'
import { maxLength, required } from '@vuelidate/validators'
import AZErrorBlock from "../../utility/AZErrorBlock.vue";
export default {
    name: 'BasicInfo',
    components: { AZInputGroup, BasicInfoUploadSpinner, BasicInfoError, BasicInfoImage, BasicInfoButtons, BasicInfoPhoneInput, AZErrorBlock },
    setup() {
        const store = useStore();
        const auth = getAuth()
        const firstName = ref(store.state.account.firstName)
        const lastName = ref(store.state.account.lastName)
        const phoneNumber = ref(store.state.account.phoneNumber)
        const companyName = ref(store.state.account.companyName)
        const streetAddress = ref(store.state.account.streetAddress)
        const zipCode = ref(store.state.account.zipCode)
        const unit = ref(store.state.account.unit)
        const isEditable = ref(false)
        const fileRef = ref(null)

        const postRequest = reactive({
            reqLoading: false,
            reqError: ''
        })

        const profilePicRequest = reactive({
            picLoading: false,
            picError: ''
        })

        const rules = computed(() => ({
            firstName: { required, maxLength: maxLength(30) },
            lastName: { required, maxLength: maxLength(40) },
            companyName: { required, maxLength: maxLength(50) }
        }))

        const v = useVuelidate(rules, { firstName, lastName, companyName })

        const handleFormatPhoneNumber = formattedNumber => phoneNumber.value = formattedNumber

        const uploadPhoto = () => {
            if (!isEditable.value || postRequest.reqLoading) return
            fileRef.value.click()
        }

        const handleFileNameChange = async (event) => {
            if (event.type === 'click' || event.target.files.length < 1) return;
            profilePicRequest.picLoading = true;
            profilePicRequest.picError = '';
            try {
                let formData = new FormData();
                formData.append('imageInput', event.target.files[0]);
                await store.dispatch("account/postProfilePicture", { user: auth.currentUser, data: formData })
            }
            catch (err) { profilePicRequest.picError = 'An error occurred on upload.' }
            finally { profilePicRequest.picLoading = false; }
        }

        const handleEditClick = action => {
            postRequest.reqLoading = false;
            postRequest.reqError = '';
            profilePicRequest.picLoading = false;
            profilePicRequest.picError = '';
            if (!action) {
                firstName.value = store.state.account.firstName
                lastName.value = store.state.account.lastName
                phoneNumber.value = store.state.account.phoneNumber
                companyName.value = store.state.account.companyName
                streetAddress.value = store.state.account.streetAddress
                zipCode.value = store.state.account.zipCode
                unit.value = store.state.account.unit
            }
            isEditable.value = action
        }

        const submitInfo = async () => {
            if (v.value.$invalid) {
                return postRequest.reqError = "Please fill out all required fields."
            }
            postRequest.reqLoading = true;
            postRequest.reqError = ''
            const request = {
                firstName: firstName.value,
                lastName: lastName.value,
                phoneNumber: phoneNumber.value,
                companyName: companyName.value,
                streetAddress: streetAddress.value,
                zipCode: zipCode.value,
                unit: unit.value
            }
            try {
                await store.dispatch("account/postAccount", { user: auth.currentUser, request: request })
                isEditable.value = false
            } catch (err) {
                console.log("err")
                postRequest.reqError = "An error occurred. Please try again.";
            } finally {
                postRequest.reqLoading = false
            }
        }

        return {
            photoUrl: computed(() => store.state.account.photoUrl),
            firstName,
            lastName,
            phoneNumber,
            companyName,
            streetAddress,
            zipCode,
            unit,
            isEditable,
            fileRef,
            v,
            handleFormatPhoneNumber,
            ...toRefs(postRequest),
            ...toRefs(profilePicRequest),
            uploadPhoto,
            handleEditClick,
            submitInfo,
            handleFileNameChange
        }
    }
}
</script>

<style scoped>
.profile-img {
    max-width: 100%;
    min-height: 100px;
    max-height: 100px;
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

.basic-info-name,
.basic-info-address {
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
.zip-addr,
.unit-addr {
    flex: 0 0 47.5%;
}

.feedback-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-right: auto;
    margin-left: auto;
}

@media screen and (max-width: 260px) {
    .secondary-addr {
        flex-direction: column;
    }
}
@media screen and (max-width: 360px) {
    .button-wrappers {
        flex-direction: column;
    }
}
@media screen and (min-width: 500px) {
    .basic-info-name,
    .basic-info-address {
        flex-direction: row;
    }
    .name-input {
        flex: 0 0 48%;
    }
    .main-addr {
        flex: 0 0 60%;
    }

    .secondary-addr {
        flex: 0 0 37%;
    }

    .zip-addr {
        flex: 0 0 47.5%;
    }

    .unit-addr {
        flex: 0 0 47.5%;
    }
    .single-line-input {
        width: 47.5%;
    }
    .feedback-wrapper {
        width: 50%;
    }
}
</style>
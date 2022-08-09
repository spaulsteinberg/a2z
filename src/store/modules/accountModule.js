import getFirebaseIdToken from '../../firebase/getFirebaseIdToken'
import axios from 'axios'

const initialState = () => {
    return {
        hasData: false,
        error: '',
        isLoading: false,
        photoUrl: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        streetAddress: '',
        zipCode: '',
        unit: '',
        isDriver: true
    }
}

const accountModule = {
    namespaced: true,
    state: initialState,
    getters: {
        getHasData: state => state.hasData,
        getError: state => state.error,
        getIsLoading: state => state.isLoading,
        getPhotoUrl: state => state.photoUrl,
        getFirstName: state => state.firstName
    },
    mutations: {
        setPhotoUrl: (state, payload) => { state.photoUrl = payload },
        setFirstName: (state, payload) => { state.firstName = payload },
        setLastName: (state, payload) => { state.lastName = payload },
        setPhoneNumber: (state, payload) => { state.phoneNumber = payload },
        setCompanyName: (state, payload) => { state.companyName = payload },
        setStreetAddress: (state, payload) => { state.streetAddress = payload },
        setZipCode: (state, payload) => { state.zipCode = payload },
        setUnit: (state, payload) => { state.apt = payload },
        setAllBasicFields: (state, { firstName, lastName, phoneNumber, companyName, streetAddress, zipCode, unit, isDriver }) => {
            state.firstName = firstName;
            state.lastName = lastName;
            state.phoneNumber = phoneNumber;
            state.companyName = companyName;
            state.streetAddress = streetAddress;
            state.zipCode = zipCode;
            state.unit = unit;
            state.isDriver = Boolean(isDriver)
        },
        setHasData: (state, payload) => state.hasData = payload,
        setError: (state, payload) => state.error = payload,
        setIsLoading: (state, payload) => state.isLoading = payload,
        reset: state => {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    },
    actions: {
        async getAccount({ commit }, user) {
            try {
                commit('setIsLoading', true)
                commit('setError', '')
                commit('setHasData', false)
                const token = await getFirebaseIdToken(user)
                const res = await axios.get(process.env.VUE_APP_ACCOUNT_PATH, { headers: { token: token } })
                commit('setAllBasicFields', res.data.data)
                commit('setPhotoUrl', res.data.data.photoUrl)
                commit('setHasData', true)
            } catch (err) {
                console.log(err)
                commit('setError', 'Something went wrong.')
            } finally {
                commit('setIsLoading', false)
            }
        },
        async postAccount({ commit }, payload) {
            try {
                const token = await getFirebaseIdToken(payload.user)
                await axios.post(process.env.VUE_APP_ACCOUNT_PATH, payload.request, { headers: { token: token } })
                commit('setAllBasicFields', payload.request)
            } catch (err) {
                console.log("token error", err)
                throw new Error("Something went wrong posting account.")
            }
        },
        async postProfilePicture({ commit }, { data, user }) {
            try {
                console.log("VUEX FILE", data)
                const token = await getFirebaseIdToken(user)
                const res = await axios.post(`${process.env.VUE_APP_ACCOUNT_PATH}/profile/picture`, data,
                    {
                        headers: {
                            token: token,
                            "Content-Type": "multipart/form-data"
                        }
                    })
                commit('setPhotoUrl', res.data.data)
            } catch (err) {
                console.log(err)
                throw new Error("Could not upload profile picture.")
            }
        }
    }
}

export default accountModule
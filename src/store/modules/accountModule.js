import getFirebaseIdToken from '../../firebase/getFirebaseIdToken'
import axios from 'axios'

const accountModule = {
    namespaced: true,
    state: {
        photoUrl: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        streetAddress: '',
        zipCode: '',
        apt: '',
    },
    getters: {
        getFirstName: state => state.firstName
    },
    mutations: {
        setPhotoUrl: (state, payload) => state.photoUrl = payload,
        setFirstName: (state, payload) => state.firstName = payload,
        setLastName: (state, payload) => state.lastName = payload,
        setPhoneNumber: (state, payload) => state.phoneNumber = payload,
        setCompanyName: (state, payload) => state.companyName = payload,
        setStreetAddress: (state, payload) => state.streetAddress = payload,
        setZipCode: (state, payload) => state.zipCode = payload,
        setApt: (state, payload) => state.apt = payload,
        setAllBasicFields: (state, { photoUrl, firstName, lastName, phoneNumber , companyName, streetAddress, zipCode, apt }) => {
            state.photoUrl = photoUrl;
            state.firstName = firstName;
            state.lastName = lastName;
            state.phoneNumber = phoneNumber;
            state.companyName = companyName;
            state.streetAddress = streetAddress;
            state.zipCode = zipCode;
            state.apt = apt;
        }
    },
    actions: {
        async getAccount({ commit }, user){
            try {
                const token = await getFirebaseIdToken(user)
                const res = await axios.get(process.env.VUE_APP_ACCOUNT_PATH, { headers: { token: token } })
                commit('setAllBasicFields', res.data.data)
            } catch (err) {
                console.log(err)
                throw new Error("Something went wrong fetching account.")
            }
        },
        async postAccount({ commit }, payload) {
            try {
                const token = await getFirebaseIdToken(payload.user)
                await axios.post("http://localhost:3000/api/v1/account", payload.request, { headers: { token: token } })
                commit('setAllBasicFields', payload.request)
            } catch (err) {
                console.log("token error", err)
                throw new Error("Something went wrong posting account.")
            }
        }
    }
}

export default accountModule
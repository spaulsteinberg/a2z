
const googleMapsModule = {
    namespaced: true,
    state: {
        google: null,
        mapMounted: false,
        loading: false,
        error: null
    },
    getters: {
        getMap: state => state.google
    },
    mutations: {
        setMap(state, payload) { state.google = payload },
        setMapLoading(state, payload) { state.loading = payload },
        setMapError(state, payload) { state.error = payload },
        setMapMounted(state, payload) { state.mapMounted = payload }
    }
}

export default googleMapsModule
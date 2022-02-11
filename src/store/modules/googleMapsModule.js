
const googleMapsModule = {
    namespaced: true,
    state: {
        google: null,
        map: null,
        markers: {
            source: null,
            destination: null,
        },
        mapMounted: false,
        loading: false,
        error: null
    },
    getters: {
        getMap: state => state.google,
        getSourceMarker: state => state.markers.source,
        getDestinationMarker: state => state.markers.destination
    },
    mutations: {
        setGoogle(state, payload) { state.google = payload },
        setMap(state, payload) { state.map = payload },
        setMapLoading(state, payload) { state.loading = payload },
        setMapError(state, payload) { state.error = payload },
        setMapMounted(state, payload) { state.mapMounted = payload },
        setStartMarker(state, { lat, lng, label }){
            state.markers.source = { lat, lng, label }
        },
        setDestinationMarker(state, { lat, lng, label }){
            state.markers.destination = { lat, lng, label }
        },
        removeMarkers(state, _) {
            state.markers.source = null
            state.markers.destination = null
        }
    }
}

export default googleMapsModule
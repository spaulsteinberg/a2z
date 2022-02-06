
const setMarker = (google, map, lat, lng, label) => {
    return new google.maps.Marker({
        position: { lat, lng },
        map: map,
        label: label
    })
}

const googleMapsModule = {
    namespaced: true,
    state: {
        google: null,
        map: null,
        markers: {
            source: null,
            destination: null
        },
        mapMounted: false,
        loading: false,
        error: null
    },
    getters: {
        getMap: state => state.google,
    },
    mutations: {
        setGoogle(state, payload) { state.google = payload },
        setMap(state, payload) { state.map = payload },
        setMapLoading(state, payload) { state.loading = payload },
        setMapError(state, payload) { state.error = payload },
        setMapMounted(state, payload) { state.mapMounted = payload },
        setStartMarker(state, { lat, lng, label }){
            state.markers.source = setMarker(state.google, state.map, lat, lng, label)
        },
        setDestinationMarker(state, { lat, lng, label }){
            state.markers.destination = setMarker(state.google, state.map, lat, lng, label)
        }
    }
}

export default googleMapsModule
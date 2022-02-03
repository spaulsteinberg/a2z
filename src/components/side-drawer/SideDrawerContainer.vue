<template>
  <div class="source-dest-container">
    <AZInputGroup v-model.trim="source" id="source-loc" placeholder="Enter your starting point" labelText="Start: " hasMargin/>
    <AZInputGroup v-model.trim="destination" id="destination-loc" placeholder="Choose your destination" labelText="Destination: " hasMargin/>
    <button class="btn btn-primary mt-2" @click="handleGeocodingSubmit()">Go!</button>
  </div>
</template>

<script>
    import { ref, onMounted, reactive } from 'vue'
    import AZInputGroup from '../utility/AZInputGroup.vue';
    export default {
        name: 'SideDrawerContainer',
        components: {
          AZInputGroup
        },
        setup(props){
          const source = ref('');
          const destination = ref('')

          const inputState = reactive({
            autocompleteSource: null,
            autocompleteDestination: null,
          })

          onMounted(() => {
            inputState.autocompleteSource = new window.google.maps.places.Autocomplete(
              document.getElementById("source-loc")
            )

            inputState.autocompleteDestination = new window.google.maps.places.Autocomplete(
              document.getElementById("destination-loc")
            )

            inputState.autocompleteSource.setComponentRestrictions({
              country: ["us"]
            })

            inputState.autocompleteDestination.setComponentRestrictions({
              country: ["us"]
            })
          })
          
          function handleGeocodingSubmit(){
            props.handleSubmit(inputState.autocompleteSource.getPlace(), inputState.autocompleteDestination.getPlace())
          }

          return {
            source,
            destination,
            handleGeocodingSubmit
          }
        },
        props: {
          handleSubmit: {
            type: Function,
            required: true
          }
        }
    }
</script>

<style scoped>
  .source-dest-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
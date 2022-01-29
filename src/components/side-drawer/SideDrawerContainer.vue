<template>
  <div class="source-dest-container">
    <InputGroup v-model.trim="source" id="source-loc" labelText="Start: " hasMargin/>
    <InputGroup v-model.trim="destination" id="destination-loc" labelText="Destination: " hasMargin/>
    <button class="btn btn-primary mt-2" @click="handleSubmit(source, destination)">Go!</button>
  </div>
</template>

<script>
    import { ref } from 'vue'
    import InputGroup from '../utility/InputGroup.vue';
    export default {
        name: 'SideDrawerContainer',
        components: {
          InputGroup
        },
        setup(){
          const source = ref('');
          const destination = ref('')
          return {
            source,
            destination
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
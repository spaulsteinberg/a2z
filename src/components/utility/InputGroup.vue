<template>
    <div :class="[hasMargin && 'my-2', 'form-group']">
      <label :for="id">{{labelText}}</label>
      <input :type="type" class="form-control" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script>
    export default {
        name: 'InputGroup',
        setup(){

        },
        props: {
            id: {
                type: String,
                required: true
            },
            hasMargin: {
                type: Boolean,
                default: true,
                required: false
            },
            modelValue: {
                type: String,
                default: '',
                required: true
            },
            labelText: {
                type: String,
                default: '',
                required: false
            },
            type: {
                type: String,
                default: 'text',
                required: false
            }
        }
    }
</script>

<style scoped>

</style>
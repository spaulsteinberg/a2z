<template>
    <div :class="[hasMargin && 'my-2', 'form-group']">
      <label :for="id">{{labelText}}</label>
      <input :type="type" :class="['form-control', isInvalid && 'is-invalid']" :id="id" :placeholder="placeholder" :value="modelValue" @blur="handleBlur" @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled" :step="step"/>
    </div>
</template>

<script>
    export default {
        name: 'AZInputGroup',
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
            },
            placeholder: {
                type: String,
                default: '',
                required: false
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false
            },
            handleBlur: {
                type: Function,
                default: () => {},
                required: false
            },
            isInvalid: {
                type: Boolean,
                default: false,
                required: false
            },
            step: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped>

</style>
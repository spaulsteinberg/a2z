<template>
    <div class="form-group">
        <label :for="id">{{ labelText }}</label>
        <select
            :class="['form-select', isInvalid && 'is-invalid']"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled"
            :id="id"
        >
        <option v-for="item of items" :key="item" :value="item">{{ item }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'AZSelectGroup',
    props: {
        items: {
            type: Array,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        labelText: {
            type: String,
            required: false
        },
        isInvalid: {
            type: Boolean,
            required: false,
            default: true
        },
        modelValue: {
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
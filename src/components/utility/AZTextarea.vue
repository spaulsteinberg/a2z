<template>
    <div class="form-group">
        <label :for="id">{{ labelText }}</label>
        <textarea
            :class="['form-control', isInvalid && 'is-invalid']"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="handleBlur"
            :disabled="disabled"
            :id="id"
            :rows="rows"
        >
        </textarea>
    </div>
</template>

<script>
export default {
    name: 'AZTextarea',
    props: {
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
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        rows: {
            type: Number,
            default: 3,
            required: false
        },
        handleBlur: {
            type: Function,
            default: () => {},
            required: false
        },
    }
}
</script>
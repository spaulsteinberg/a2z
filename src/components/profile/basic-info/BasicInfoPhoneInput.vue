<template>
    <div :class="[hasMargin && 'my-2', 'form-group']">
      <label :for="id">{{labelText}}</label>
      <input type="text" class="form-control" :id="id" :value="value" @change="handleChange" name="phoneNumber" :disabled="disabled" />
    </div>
</template>

<script>
export default {
    name: 'BasicInfoPhoneInput',
    props: {
        value: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        labelText: {
            type: String,
            required: false,
            default: ''
        },
        hasMargin: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    setup(_, context) {
        const formatPhoneNumber = val => {
            if (!val) return val;
            const number = val.replace(/[^\d]/g, '');
            const phoneNumberLength = number.length;
            if (phoneNumberLength < 4) return number;
            if (phoneNumberLength < 7) {
                return `(${number.slice(0, 3)}) ${number.slice(3)}`;
            }
            return `(${number.slice(0, 3)}) ${number.slice(
                3,
                6
            )}-${number.slice(6, 10)}`;
        }

        const handleChange = event => {
            context.emit('handleFormatPhoneNumber', formatPhoneNumber(event.target.value))
        }

        return {
            handleChange
        }
    },
    emits: ['handleFormatPhoneNumber']
}
</script>

<style scoped>
</style>
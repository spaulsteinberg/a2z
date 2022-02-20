<template>
    <img
        class="img-fluid rounded mx-auto my-3 profile-img"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Change Profile Picture"
        alt="profile-pic"
        :src="photoUrl ? photoUrl : require('../../../../src/assets/person-outline.png')"
        @click="uploadPhoto"
    />
</template>

<script>
export default {
    name: 'BasicInfoImage',
    props: {
        photoUrl: {
            type: String,
            required: true
        },
        uploadPhoto: {
            type: Function,
            required: true
        }
    }
}
</script>

<style scoped>
</style>
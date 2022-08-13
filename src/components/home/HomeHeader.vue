<template>
<div class="top-header-container">
      <h1>A Better Way To Get From a to z.</h1>
    </div>
    <div class="top-description">
      <p v-if="userIsLoggedIn">
        Welcome back! Looks like your all logged in. If you need a refresher,
        create new tickets at the Explore page. Manage and check the progress of
        tickets at the Ticket table. Update your profile in the Manage Account
        tab. For the fastest route, tap the buttons below.
      </p>
      <p v-else>
        Professional truck driver? Browse our listings for long-haul jobs.
        Looking to earn some spending money? We have that too. Look for listings
        you can do from the comfort of your truck or car.
      </p>
    </div>
</template>

<script>
export default {
    name: 'HomeHeader',
    props: {
        userIsLoggedIn: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
.top-header-container, .top-description {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .top-header-container, .top-description {
    width: 50%;
  }
}
</style>
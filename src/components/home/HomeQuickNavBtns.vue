<template>
  <div class="top-button-container">
    <template v-if="userIsLoggedIn">
      <router-link to="/explore">
        <button
          class="btn btn-link-top btn-primary"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="500"
          data-aos-duration="900"
        >
          Explore
        </button>
      </router-link>
      <router-link
        to="/tickets/view"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-delay="700"
        data-aos-duration="900"
      >
        <button class="btn btn-info btn-link-top tickets-button">
          Tickets
        </button>
      </router-link>
      <router-link to="/profile/account">
        <button
          class="btn btn-link-top btn-secondary"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="900"
          data-aos-duration="900"
        >
          Account
        </button>
      </router-link>
    </template>
    <template v-else>
      <router-link to="/login">
        <button
          class="btn btn-primary"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="500"
          data-aos-duration="900"
        >
          Login
        </button>
      </router-link>
      <router-link to="/signup">
        <button
          class="btn sign-up-button"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="700"
          data-aos-duration="900"
        >
          Sign Up
        </button>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "HomeQuickNavBtns",
  props: {
    userIsLoggedIn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.sign-up-button {
  background-color: var(--pink-theme);
  color: white;
  margin-left: 0px;
  margin-top: 8px;
}

.top-button-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.btn-link-top {
  margin-right: 8px !important;
  margin-left: 8px !important;
}

.tickets-button {
  margin: 8px 0;
}

@media screen and (min-width: 500px) {
  .top-button-container {
    flex-direction: row;
  }
  .sign-up-button {
    margin-left: 8px;
    margin-top: 0;
  }

  .tickets-button {
    margin: 0 8px;
  }
  .btn-link-top {
    margin-right: 0;
    margin-left: 0;
  }
}
</style>

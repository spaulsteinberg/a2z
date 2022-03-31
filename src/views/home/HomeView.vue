<template>
  <section id="top" class="global-home-padding">
    <div class="top-header-container">
      <h1>A Better Way To Get From a to z.</h1>
    </div>
    <div class="top-description">
      <p v-if="userIsLoggedIn">
        Welcome back! Looks like your all logged in. If you need a refresher, create new tickets at the Explore page. 
        Manage and check the progress of tickets at the Ticket table. Update your profile in the Manage Account tab. For the fastest route, tap the buttons below.
      </p>
      <p v-else>
        Professional truck driver? Browse our listings for long-haul jobs. 
        Looking to earn some spending money? We have that too. Look for listings you can do from the comfort of your truck or car.
      </p>
    </div>
    <div class="top-button-container">
      <template v-if="userIsLoggedIn">
        <router-link to="/explore">
          <button class="btn btn-primary" data-aos="fade-up" data-aos-once="true" data-aos-delay="500" data-aos-duration="900">
            Explore
          </button>
        </router-link>
        <router-link to="/tickets/view" data-aos="fade-up" data-aos-once="true" data-aos-delay="700" data-aos-duration="900">
          <button class="btn btn-info tickets-button">
            Tickets
          </button>
        </router-link>
        <router-link to="/profile/account">
          <button class="btn btn-secondary" data-aos="fade-up" data-aos-once="true" data-aos-delay="900" data-aos-duration="900">
            Account
          </button>
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login">
          <button class="btn btn-primary" data-aos="fade-up" data-aos-once="true" data-aos-delay="500" data-aos-duration="900">
            Login
          </button>
        </router-link>
        <router-link to="/signup">
          <button class="btn sign-up-button" data-aos="fade-up" data-aos-once="true" data-aos-delay="700" data-aos-duration="900">
            Sign Up
          </button>
        </router-link>
      </template>
    </div>
  </section>
  <section id="supply-section">
    <div class="for-suppliers text-white global-home-padding">
        <div class="supplier-content">
          <h1>a2z Supply</h1>
          <p>See how you can post tickets for drivers to pick up and manage your tickets to get jobs done fast.</p>
          <button class="btn btn-secondary">Learn More</button>
        </div>
    </div>
    <div class="text-dark">
      create a ticket
    </div>
    <div>
      link to apps
    </div>
  </section>
</template>

<script>
import { getAuth } from "@firebase/auth"
import { computed } from "vue"

export default {
  name: "HomeView",
  setup() {
    const auth = getAuth()
    const userIsLoggedIn = computed(() => auth.currentUser ? true : false)
    return {
      userIsLoggedIn
    }
  }
}
</script>

<style scoped>

#top {
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  min-height: 200px;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.for-suppliers {
  background-image: url("../../assets/skyscaper-highway123.jpeg");
  min-height: 300px;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.sign-up-button {
  background-color: var(--pink-theme);
  color: white;
  margin-left: 0px;
  margin-top: 8px;
}

.supplier-content {
  width: 100%;
}

.global-home-padding {
  padding: 0 3rem;
  font-size: 1.25rem;
}

.top-header-container, .top-description {
  width: 100%;
}

.top-button-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.tickets-button {
  margin: 8px 0;
}

@media screen and (min-width: 500px) {
  .top-button-container {
    flex-direction: row;
  }

  .top-header-container, .top-description {
    width: 50%;
  }
  .sign-up-button {
    margin-left: 8px;
    margin-top: 0;
  }

  .tickets-button {
    margin: 0 8px;
  }

  .supplier-content {
    width: 50%;
  }
}

</style>
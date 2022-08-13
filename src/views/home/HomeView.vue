<template>
  <section id="top" class="global-home-padding">
    <HomeHeader :userIsLoggedIn="userIsLoggedIn" />
    <HomeQuickNavBtns :userIsLoggedIn="userIsLoggedIn" />
  </section>
  <HomeSection sectionId="supply-section" align="end">
    <template v-slot:content>
      <h1>a2z Supply</h1>
        <p>
          See how you can post tickets for drivers to pick up and manage your
          tickets to get jobs done fast.
        </p>
        <button class="btn btn-secondary">Learn More</button>
    </template>
  </HomeSection>
  <HomeSection sectionId="drive-section" align="start">
    <template v-slot:content>
      <h1>a2z Drive</h1>
        <p>
          See how you can pick up tickets as a driver, and make money doing what you love.
        </p>
        <button class="btn btn-secondary">Learn More</button>
    </template>
  </HomeSection>
  <HomeDevices :width="48" :height="48" fill="white" />
</template>

<script>
import { getAuth } from "@firebase/auth";
import { computed } from "vue";
import HomeHeader from "../../components/home/HomeHeader.vue";
import HomeQuickNavBtns from "../../components/home/HomeQuickNavBtns.vue";
import HomeSection from "../../components/home/HomeSection.vue";
import HomeDevices from "../../components/home/HomeDevices.vue";

export default {
    name: "HomeView",
    setup() {
        const auth = getAuth();
        const userIsLoggedIn = computed(() => (auth.currentUser ? true : false));
        return {
            userIsLoggedIn,
        };
    },
    components: { HomeHeader, HomeQuickNavBtns, HomeSection, HomeDevices }
};
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

.global-home-padding {
  padding: 0 3rem;
  font-size: 1.25rem;
}
</style>

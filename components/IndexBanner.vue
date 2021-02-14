<template>
  <b-container fluid class="banner">
    <b-row align-v="end">
      <b-col>
        <img class="logo" alt="Vue logo" src="../assets/logo.svg" />
        <h1 id="tagline">Self-hosted, private, social networking</h1>
        <h3>First time here? <nuxt-link to="/signup">Sign up</nuxt-link></h3>
        <h3>
          We're developing this site?
          <nuxt-link to="/feed">View the feed</nuxt-link>
        </h3>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "IndexBanner",
};
</script>
<style scoped>
.banner {
  text-align: center;
}
.logo {
  width: 30%;
}
</style>
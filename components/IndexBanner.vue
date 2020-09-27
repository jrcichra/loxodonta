<template>
  <b-container fluid class="banner">
    <b-row align-v="end">
      <b-col>
        <h1 id="tagline">Self-hosted, private, social networking</h1>
        <h3>First time here? <nuxt-link to="/signup">Sign up</nuxt-link></h3>
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
  height: 50%;
  text-align: center;
  margin-top: 23rem;
}
</style>
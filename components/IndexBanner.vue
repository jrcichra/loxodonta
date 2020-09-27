<template>
  <b-container fluid class="banner">
    <b-row align-v="end">
      <b-col>
        <h1 id="tagline">Self-hosted, private, social networking</h1>
        <h3>First time here? <a href="/signup">Sign up</a></h3>
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
<template>
  <b-container fluid id="profile">
    <b-row>
      <b-col>
        <p>{{ id }}</p></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style scoped>
</style>

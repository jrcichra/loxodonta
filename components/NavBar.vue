<template>
  <b-container fluid class="navbar shadow-lg rounded">
    <b-row>
      <b-col>
        <img class="logo" alt="Vue logo" src="../assets/logo.svg" />
      </b-col>
      <b-col>
        <h1 class="title">Loxodonta</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgb(134, 84, 146);
  padding: 5px;
}
.logo {
  height: 40px;
  transform: scale(-1, 1);
}
.title {
  font-size: 17px;
  margin-top: 0.6rem;
}
</style>

<template>
  <b-container fluid id="app">
    <b-row>
      <b-col cols="4"> </b-col>
      <b-col cols="4">
        <Feed />
      </b-col>
      <b-col cols="2"> </b-col>
      <b-col cols="2">
        <FriendList />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a222b;

  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>

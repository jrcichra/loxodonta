<template>
  <b-container fluid id="app">
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="6">
        <Feed :data="feed" />
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col cols="2">
        <FriendList />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import feed from "~/queries/feed";

export default {
  name: "App",
  apollo: {
    feed: {
      query: feed,
      prefetch: true,
      variables() {
        return { id: 1, top: 20 };
      },
    },
  },
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

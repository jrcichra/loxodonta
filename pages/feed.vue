<template>
  <b-container fluid id="app">
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="6">
        <PostForm :user="user" />
        <Feed :feed="feed" />
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col cols="2">
        <FriendList :friends="real_friends" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import feed from "~/queries/feed";
import friends from "~/queries/friends";
import user from "~/queries/user";
export default {
  name: "App",
  apollo: {
    feed: {
      query: feed,
      prefetch: false,
      variables() {
        return { id: 1, top: 20 };
      },
    },
    friends: {
      query: friends,
      prefetch: false,
      variables() {
        return { id: 1 };
      },
      update: (data) => data.user,
    },
    user: {
      query: user,
      prefetch: false,
      variables() {
        return { id: 1 };
      },
    },
  },
  computed: {
    real_friends: function () {
      if (this.friends === undefined) {
        return [];
      }
      return this.friends.user_friends;
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

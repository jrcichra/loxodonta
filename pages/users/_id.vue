<template>
  <b-container fluid id="profile">
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="">
        <ProfileBanner
          v-if="user !== undefined"
          :avatar="getAvatar(user)"
          :username="user.user_name"
          :bio="user.user_bio"
          :userid="user.user_id"
        />
        <Feed v-if="user !== undefined" :userid="user.user_id" />
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col cols="2"> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import user from "~/queries/user";

export default {
  name: "Profile",
  apollo: {
    user: {
      query: user,
      prefetch: false,
      variables() {
        return { id: Number(this.$route.params.id) };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    getAvatar: function (friend) {
      console.log("this is the place");
      console.log(friend);
      if (friend !== undefined && friend.user_avatar !== null) {
        return friend.user_avatar.object_url;
      } else {
        return "http://localhost:3000/_nuxt/assets/logo.svg";
      }
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <b-container fluid id="profile">
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="">
        <ProfileBanner
          v-if="user !== undefined"
          :avatar="user.user_avatar.object_url"
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
  methods: {},
};
</script>

<style scoped>
</style>

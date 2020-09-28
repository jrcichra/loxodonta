<template>
  <b-container fluid id="profile">
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="">
        <ProfileBanner
          :avatar="profileData[id].avatar"
          :username="profileData[id].username"
          :bio="profileData[id].bio"
          :userid="id"
        />
        <Feed :userid="id" />
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col cols="2"> </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      id: Number(this.$route.params.id),
      profileData: [
        {
          userid: 0,
          username: "Justin",
          bio: "I like software",
          avatar: "http://localhost:3000/_nuxt/assets/logo.svg",
        },
        {
          userid: 1,
          username: "Tim",
          bio: "I like elephants",
          avatar: "http://localhost:3000/_nuxt/assets/logo.svg",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>

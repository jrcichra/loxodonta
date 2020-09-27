<template>
  <b-container id="friendlist" class="shadow-lg" fluid>
    <b-row>
      <b-col> <p>Friends</p></b-col>
    </b-row>
    <b-row v-for="friend in friends" :key="friend.id">
      <b-col>
        <SmallFriendCard
          :username="friend.username"
          :avatar="friend.avatar"
          :status="friend.status"
        />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "FriendList",
  data() {
    return {
      friends: [
        {
          username: "Justin",
          avatar: "_nuxt/assets/logo.svg",
          status: "online",
        },
        {
          username: "Tim",
          avatar: "_nuxt/assets/logo.svg",
          status: "offline",
        },
      ],
    };
  },
};
</script>
<style scoped>
#friendlist {
  text-align: center;
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
</style>
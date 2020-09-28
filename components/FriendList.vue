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
          :userid="friend.userid"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col> <p>_</p></b-col>
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
          avatar: "http://localhost:3000/_nuxt/assets/logo.svg",
          status: "online",
          userid: 0,
        },
        {
          username: "Tim",
          avatar: "http://localhost:3000/_nuxt/assets/logo.svg",
          status: "offline",
          userid: 1,
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
<template>
  <b-container id="friendlist" class="shadow-lg" fluid>
    <b-row>
      <b-col>
        <p>Friends ({{ friends.length }})</p>
      </b-col>
    </b-row>
    <b-row v-for="friend in friends" :key="friend.id">
      <b-col>
        <SmallFriendCard
          v-if="friend.user_avatar"
          :username="friend.user_name"
          :avatar="friend.user_avatar.object_url"
          :status="friend.user_status"
          :userid="friend.user_id"
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
    return {};
  },
  props: {
    friends: Array,
  },
  methods: {},
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
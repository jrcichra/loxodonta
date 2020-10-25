<template>
  <b-container fluid>
    <b-row v-for="row in feed" :key="row.id">
      <b-col class="feed shadow-lg">
        <Card
          :username="row.post_user.user_name"
          :content="row.post_text"
          :time="row.post_created"
          :avatar="getAvatar(row.post_user)"
        />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import moment from "moment";
export default {
  name: "Feed",
  props: {
    userid: String,
    feed: Array,
  },
  data() {
    return {};
  },
  methods: {
    getAvatar: function (friend) {
      if (friend.user_avatar !== null) {
        return friend.user_avatar.object_url;
      } else {
        return "http://localhost:3000/_nuxt/assets/logo.svg";
      }
    },
  },
};
</script>
<style scoped>
.feed {
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
</style>
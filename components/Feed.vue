<template>
  <b-container fluid>
    <b-row v-for="row in feed" :key="row.id">
      <b-col class="feed shadow-lg">
        <Card
          v-if="row.post_user && row.post_user.user_avatar"
          :user_id="row.post_user.user_id"
          :username="row.post_user.user_name"
          :content="row.post_text"
          :time="row.post_created"
          :avatar="row.post_user.user_avatar.object_url"
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
  methods: {},
};
</script>
<style scoped>
.feed {
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
</style>
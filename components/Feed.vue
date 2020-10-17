<template>
  <b-container fluid>
    <b-row v-for="row in data" :key="row.id">
      <b-col class="feed shadow-lg">
        <Card
          :username="row.post_user.user_name"
          :content="row.post_text"
          :time="row.post_created"
          :avatar="
            row.post_user.user_avatar !== null
              ? row.post_user.user_avatar.object_url
              : 'http://localhost:3000/_nuxt/assets/logo.svg'
          "
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
    userid: Number,
    data: Array,
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
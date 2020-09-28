<template>
  <b-container id="card" fluid>
    <b-row>
      <b-col>
        <nuxt-link class="nolink" :to="`/users/${userid}`">
          <img height="45rem" :src="avatar" alt="" />
        </nuxt-link>
      </b-col>
      <b-col class="textslide">
        <span :class="status">{{ username }}</span>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import moment from "moment";
export default {
  name: "Card",
  props: {
    username: String,
    avatar: String,
    status: String,
    userid: Number,
  },
  methods: {
    getLocalTime(time) {
      return moment.unix(time).format("dddd, MMMM Do, YYYY h:mm:ss A");
    },
  },
  computed: {},
};
</script>
<style scoped>
#card {
  text-align: center;
  margin-top: 0.5rem;
}
.online {
  color: green;
}
.offline {
  color: red;
}
.textslide {
  margin-top: 0.5rem;
}
</style>
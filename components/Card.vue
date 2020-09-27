<template>
  <div id="card" class="shadow">
    <slot>
      <img height="100rem" :src="avatar" alt="" />

      <h1>{{ username }}</h1>
      <h2>{{ content }}</h2>
      <p>{{ getLocalTime(time) }}</p>
    </slot>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Card",
  props: {
    username: String,
    content: String,
    time: Number,
    avatar: String,
  },
  computed: {},
  methods: {
    getLocalTime(time) {
      return moment.unix(time).format("dddd, MMMM Do, YYYY h:mm:ss A");
    },
  },
};
</script>
<style scoped>
.feed {
  text-align: center;
  background-color: green;
  margin-top: 1rem;
}
#card {
}
</style>
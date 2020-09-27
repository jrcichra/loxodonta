<template>
  <div>
    <h1>{{ username }}</h1>
    <h3>{{ getLocalTime(time) }}</h3>
    <p>{{ content }}</p>
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
  },
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
</style>
<template>
  <div>
    <h1>{{ username }}</h1>
    <h3>{{ time }}</h3>
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    username: String,
    content: String,
    time: Number,
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
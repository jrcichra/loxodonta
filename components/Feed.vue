<template>
  <b-container fluid>
    <b-row v-for="row in feedData" :key="row.id">
      <b-col cols="3"> </b-col>
      <b-col cols="6" class="feed shadow-lg">
        <Card
          :username="row.username"
          :content="row.content"
          :time="row.time"
          :avatar="row.avatar"
        />
      </b-col>
      <b-col cols="3"> </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "Feed",
  data() {
    return {
      feedData: [
        {
          username: "Justin",
          content: "Feeling happy today",
          time: 1601178142,
          avatar: "_nuxt/assets/logo.svg",
        },
        {
          username: "Tim",
          content: "You won't believe what happened today!",
          time: 1591170142,
          avatar: "_nuxt/assets/logo.svg",
        },
      ],
    };
  },
};
</script>
<style scoped>
.feed {
  text-align: center;
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
</style>
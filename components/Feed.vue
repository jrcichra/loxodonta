<template>
  <b-container fluid>
    <b-row v-for="row in feedData" :key="row.id">
      <b-col cols="3"> </b-col>
      <b-col cols="6" class="feed">
        <Card
          :username="row.username"
          :content="row.content"
          :time="row.time"
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
          time: 12345,
        },
        {
          username: "Tim",
          content: "Feeling different today",
          time: 67890,
        },
      ],
    };
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
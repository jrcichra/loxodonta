<template>
  <b-container fluid @click="generateCard()">
    <b-row v-for="row in feedData" :key="row.id">
      <b-col class="feed shadow-lg">
        <Card
          :username="row.username"
          :content="row.content"
          :time="row.time"
          :avatar="row.avatar"
        />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import moment from "moment";
export default {
  name: "Feed",
  data() {
    return {
      feedData: [
        {
          username: "Justin",
          content: "Feeling happy today.",
          time: 1601178142,
          avatar: "_nuxt/assets/logo.svg",
        },
        {
          username: "Tim",
          content: "Feeling different today.",
          time: 1591170142,
          avatar: "_nuxt/assets/logo.svg",
        },
      ],
    };
  },
  methods: {
    generateCard() {
      console.log("generating a card");
      let length = 100;
      let s = window
        .btoa(
          Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2)))
            .map((b) => String.fromCharCode(b))
            .join("")
        )
        .replace(/[+/]/g, "")
        .substring(0, length);
      this.feedData.push({
        username: "Randodude",
        content: s,
        time: Number(moment().format("X")),
        avatar: "_nuxt/assets/logo.svg",
      });
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
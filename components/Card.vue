<template>
  <b-container id="card" class="shadow" fluid>
    <b-row>
      <b-col cols="1" id="avatarcol">
        <img height="40rem" :src="avatar" alt="" />
      </b-col>
      <b-col cols="2" id="infocol">
        <p id="username">{{ username }}</p>
        <p id="time">{{ reltime }}</p>
      </b-col>
      <b-col cols="9"></b-col>
    </b-row>
    <b-row>
      <b-col>
        <p id="content">{{ content }}</p>
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
    content: String,
    time: Number,
    avatar: String,
  },
  created() {
    this.genLocalTime();
    // Update the relative time every second
    this.timer = setInterval(this.genLocalTime, 1000);
  },
  beforeDestroy() {
    // Clear the timer
    clearInterval(this.timer);
  },
  methods: {
    genLocalTime() {
      this.reltime = moment.unix(this.time).fromNow();
    },
  },
  data() {
    return {
      reltime: undefined,
      timer: undefined,
    };
  },
};
</script>
<style scoped>
#username {
  margin-bottom: 0;
}
#time {
  font-size: 0.7rem;
}
#infocol {
  padding: 0%;
  max-width: 14rem;
}
#avatarcol {
  padding: 0%;
  max-width: 14rem;
}
#content {
  overflow-wrap: break-word;
}
</style>
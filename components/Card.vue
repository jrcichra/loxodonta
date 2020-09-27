<template>
  <b-container id="card" class="shadow" fluid>
    <b-row>
      <b-col cols="1" id="avatarcol">
        <img height="40rem" :src="avatar" alt="" />
      </b-col>
      <b-col cols="2" id="infocol">
        <p id="username">{{ username }}</p>
        <p id="time">{{ getLocalTime(time) }}</p>
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
  computed: {},
  methods: {
    getLocalTime(time) {
      return moment.unix(time).fromNow();
    },
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
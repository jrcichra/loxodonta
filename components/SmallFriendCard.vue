<template>
  <div id="card" class="shadow">
    <slot>
      <img height="40rem" :src="avatar" alt="" />
      <b-container fluid>
        <b-row>
          <b-col>
            <p>{{ username }}</p>
          </b-col>
          <b-col>
            <p :style="{ color: statusColor }">{{ status }}</p>
          </b-col>
        </b-row>
      </b-container>
    </slot>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Card",
  props: {
    username: String,
    avatar: String,
    status: String,
  },
  computed: {},
  methods: {
    getLocalTime(time) {
      return moment.unix(time).format("dddd, MMMM Do, YYYY h:mm:ss A");
    },
  },
  computed: {
    statusColor: function () {
      return this.status === "online" ? "green" : "red";
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
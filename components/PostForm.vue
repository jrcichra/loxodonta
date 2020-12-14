<template>
  <b-container id="card" class="shadow postform" fluid>
    <b-row>
      <b-col cols="1" id="avatarcol">
        <nuxt-link
          v-if="user && user.user_id"
          class="nolink"
          :to="`/users/${user.user_id}`"
        >
          <img
            v-if="user && user.user_avatar && user.user_avatar.object_url"
            height="40rem"
            :src="user.user_avatar.object_url"
            alt=""
          />
        </nuxt-link>
      </b-col>
      <b-col cols="2" id="infocol">
        <p v-if="user && user.user_name" id="username">{{ user.user_name }}</p>
      </b-col>
      <b-col cols="9"></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-input
          id="content"
          :placeholder="placeholder"
          v-model="content"
        />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import moment from "moment";
export default {
  name: "PostForm",
  props: {
    user: Object,
    content: String,
  },
  data() {
    return {
      username: "Justin",
      placeholder: "What's on your mind?",
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

.postform {
  background-color: rgb(26, 26, 26);
  color: rgb(190, 182, 182);
  margin-top: 1rem;
}
</style>